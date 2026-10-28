import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { appendFileSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { prepareCedar } from './prepare-cedar.mjs';

const directory = path.dirname(fileURLToPath(import.meta.url));
const source = JSON.parse(readFileSync(path.join(directory, 'cedar-source.json'), 'utf8'));
const original = path.resolve(directory, '../../rei-cedar');

test('prepares a clean pinned checkout, preserves unrelated work, and is idempotent', () => {
  const temporary = mkdtempSync(path.join(tmpdir(), 'cedar-source-'));
  const cedar = path.join(temporary, 'rei-cedar');
  try {
    execFileSync('git', ['clone', '--shared', '--no-checkout', original, cedar], { stdio: 'pipe' });
    execFileSync('git', ['-C', cedar, 'checkout', '--detach', source.commit], { stdio: 'pipe' });
    appendFileSync(path.join(cedar, 'README.md'), '\nLocal work retained.\n');
    assert.equal(prepareCedar(cedar), 'ready');
    const scripts = JSON.parse(readFileSync(path.join(cedar, 'package.json'), 'utf8')).scripts;
    assert.ok(scripts['build:variables']);
    assert.match(readFileSync(path.join(cedar, 'README.md'), 'utf8'), /Local work retained/);
    const before = execFileSync('git', ['-C', cedar, 'diff'], { encoding: 'utf8' });
    assert.equal(prepareCedar(cedar), 'ready');
    assert.equal(execFileSync('git', ['-C', cedar, 'diff'], { encoding: 'utf8' }), before);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test('rejects a different revision without overwriting local changes', () => {
  const temporary = mkdtempSync(path.join(tmpdir(), 'cedar-conflict-'));
  const cedar = path.join(temporary, 'rei-cedar');
  try {
    execFileSync('git', ['clone', '--shared', '--no-checkout', original, cedar], { stdio: 'pipe' });
    execFileSync('git', ['-C', cedar, 'checkout', '--detach', `${source.commit}^`], { stdio: 'pipe' });
    const file = path.join(cedar, 'README.md');
    appendFileSync(file, '\nLocal work retained.\n');
    const local = readFileSync(file, 'utf8');
    assert.throws(() => prepareCedar(cedar), /Cedar must be at/);
    assert.equal(readFileSync(file, 'utf8'), local);
    assert.equal(execFileSync('git', ['-C', cedar, 'status', '--porcelain'], { encoding: 'utf8' }).trim(), 'M README.md');
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

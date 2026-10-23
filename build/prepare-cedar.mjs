import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const directory = path.dirname(filename);
const source = JSON.parse(readFileSync(path.join(directory, 'cedar-source.json'), 'utf8'));
const patch = path.join(directory, 'cedar-button-contract.patch');

export function prepareCedar(cedar = path.resolve(directory, '../../rei-cedar')) {
  const checksum = createHash('sha256').update(readFileSync(patch)).digest('hex');
  if (checksum !== source.patchSha256) throw new Error('The Cedar source patch checksum does not match cedar-source.json.');

  if (!existsSync(cedar)) {
    execFileSync('git', ['clone', '--no-checkout', source.repository, cedar], { stdio: 'inherit' });
    execFileSync('git', ['-C', cedar, 'fetch', 'origin', source.commit], { stdio: 'inherit' });
    execFileSync('git', ['-C', cedar, 'checkout', '--detach', source.commit], { stdio: 'inherit' });
  }
  if (!existsSync(path.join(cedar, '.git'))) throw new Error(`The existing path is not a Git checkout: ${cedar}`);

  const head = execFileSync('git', ['-C', cedar, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  if (head !== source.commit) {
    throw new Error(`Cedar must be at ${source.commit}; found ${head}. The existing checkout was left unchanged.`);
  }

  const applied = spawnSync('git', ['-C', cedar, 'apply', '--reverse', '--check', patch], { encoding: 'utf8' });
  if (applied.status === 0) return 'already-applied';

  const check = spawnSync('git', ['-C', cedar, 'apply', '--check', patch], { encoding: 'utf8' });
  if (check.status !== 0) {
    throw new Error(`The Cedar patch conflicts with the existing checkout; no files were changed.\n${check.stderr}`);
  }
  execFileSync('git', ['-C', cedar, 'apply', patch], { stdio: 'inherit' });
  return 'applied';
}

if (process.argv[1] && path.resolve(process.argv[1]) === filename) {
  console.log(`Cedar source patch: ${prepareCedar()}`);
}

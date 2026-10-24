import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const directory = path.dirname(filename);
const source = JSON.parse(readFileSync(path.join(directory, 'cedar-source.json'), 'utf8'));

export function prepareCedar(cedar = path.resolve(directory, '../../rei-cedar')) {
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

  return 'ready';
}

if (process.argv[1] && path.resolve(process.argv[1]) === filename) {
  console.log(`Cedar source: ${prepareCedar()}`);
}

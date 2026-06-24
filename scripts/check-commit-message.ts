import { readFileSync } from "node:fs";

const messageFile = process.argv[2];

if (!messageFile) {
  console.error("Missing commit message file path.");
  process.exit(1);
}

const message = readFileSync(messageFile, "utf8").trim();

const conventionalCommitPattern =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9._/-]+\))?!?: .{1,}$/;

const mergeCommitPattern = /^Merge /;
const revertCommitPattern = /^Revert /;

if (
  conventionalCommitPattern.test(message) ||
  mergeCommitPattern.test(message) ||
  revertCommitPattern.test(message)
) {
  process.exit(0);
}

console.error(`
Invalid commit message.

Expected conventional commit format:

  chore: initialize repository
  feat(web): add homepage
  fix(config): correct env parsing
  docs: add architecture overview
  ci: add github actions baseline

Actual:

  ${message}
`);

process.exit(1);

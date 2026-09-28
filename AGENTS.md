# mi-portfolio — Agent Instructions

## Project

Personal portfolio built with Astro, React, Tailwind CSS and TypeScript.

Read these files before making significant UI or product changes:

- `PRODUCT.md`
- `DESIGN.md`

Follow the existing design system and project structure. Avoid unrelated refactors.

## Development server

The development server is managed by systemd and is normally already running.

Local URL:

http://127.0.0.1:3001

Do NOT start another development server unless the existing service is unavailable.

To check it:

```bash
curl -I http://127.0.0.1:3001

## Git safety

Never create commits, push branches, merge branches, rebase, reset, or otherwise modify Git history unless the user explicitly requests that specific Git action.

Completing a coding task does NOT imply permission to commit it.

When asked to inspect, review, analyze, test, verify, or audit something:

- treat the task as read-only;
- do not modify source files;
- do not modify configuration files;
- do not create commits;
- browser-generated temporary artifacts are allowed only when required for inspection.

When modifications are explicitly requested:

- make the requested changes;
- validate them;
- leave the changes uncommitted unless the user explicitly asks for a commit.

Before finishing a coding task, run `git status --short` and report any remaining changes.

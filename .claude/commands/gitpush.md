# /gitpush - Quick Git Add, Commit, and Push Command

When the user types `/gitpush` or asks to commit and push changes, follow this workflow:

## Workflow Steps

1. **Check Status**: Run `git status` to see current changes
2. **View Diffs**: Run `git diff` and `git diff --staged` in parallel to show changes
3. **Check Recent Commits**: Run `git log --oneline -5` to understand commit message style
4. **Add Changes**: Add all relevant files with `git add .`
5. **Create Commit**: Generate a descriptive commit message following conventional commit format
6. **Push Changes**: Push to remote repository with `git push`

## Commit Message Format

The commit message should:
- Follow conventional commit format: `type(scope): description`
- Be descriptive but concise

## Example Usage

User: `/gitpush`

Assistant will:
1. Run git status and diffs
2. Add changes with `git add .`
3. Create commit with message like: `feat(components): add new user profile modal`
4. Push changes to remote repository
5. Confirm successful push
# Commit Message Guidelines

Follow conventional commit format to ensure consistent and meaningful commit messages across all project files.

## Conventional Commit Format
- Always suggest a conventional commit with a type and optional scope in lowercase letters
- Follow the format: `type(scope): description`
- Use present tense and imperative mood

## Message Requirements
- Keep the commit message concise and within 60 characters
- Ensure the commit message is ready to be pasted into the terminal without further editing
- Provide the full command to commit, not just the message
- Make messages descriptive but brief

## Commit Types
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without functionality changes
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates
- **ci**: CI/CD related changes
- **build**: Build system or external dependencies

## Scope Examples
- **components**: Changes to React components
- **styles**: CSS/Tailwind changes
- **api**: API related changes
- **config**: Configuration changes
- **deps**: Dependency updates

## Example Commit Messages
- `feat(components): add user profile modal`
- `fix(navbar): resolve mobile menu toggle`
- `style(tailwind): update color palette`
- `refactor(hooks): simplify auth logic`
- `chore(deps): update astro to latest version`

## Command Format
Provide complete git commit commands:
```bash
git commit -m "feat(components): add user authentication"
```
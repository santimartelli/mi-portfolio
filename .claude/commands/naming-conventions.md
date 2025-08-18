# Naming Conventions

Enforce specific naming conventions for React and TypeScript code to maintain consistency across all project files.

## Core Rules
- Follow standard TypeScript and JavaScript naming conventions for variables, functions, and components
- Component names should be PascalCase
- Variable and function names should be camelCase

## Components
- React components: PascalCase (e.g., `UserProfile`, `NavigationBar`)
- Component files: PascalCase with appropriate extension (e.g., `UserProfile.tsx`)
- Astro components: PascalCase with .astro extension (e.g., `Layout.astro`)

## Variables and Functions
- Variables: camelCase (e.g., `userName`, `isLoading`)
- Functions: camelCase (e.g., `getUserData`, `handleClick`)
- Boolean variables: Use auxiliary verbs (e.g., `isLoading`, `hasError`, `canEdit`)
- Event handlers: Prefix with "handle" (e.g., `handleSubmit`, `handleClick`)

## Constants
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRY_ATTEMPTS`)
- Environment variables: UPPER_SNAKE_CASE (e.g., `NODE_ENV`, `API_KEY`)

## Types and Interfaces
- Interfaces: PascalCase (e.g., `UserProfile`, `ApiResponse`)
- Types: PascalCase (e.g., `Theme`, `Status`)
- Props interfaces: Suffix with "Props" (e.g., `ButtonProps`, `ModalProps`)
- Generic type parameters: Single uppercase letter (e.g., `T`, `K`, `V`)

## Files and Directories
- Component files: PascalCase (e.g., `Header.tsx`, `UserCard.tsx`)
- Utility files: camelCase (e.g., `formatDate.ts`, `apiHelpers.ts`)
- Hook files: camelCase starting with "use" (e.g., `useAuth.ts`, `useLocalStorage.ts`)
- Directory names: camelCase or kebab-case (e.g., `components`, `utils`, `api-helpers`)

## CSS Classes
- Tailwind utilities: Follow Tailwind naming conventions
- Custom CSS classes: kebab-case (e.g., `.custom-button`, `.navigation-menu`)
- BEM methodology when needed: block__element--modifier

## API and Data
- API endpoints: kebab-case (e.g., `/api/user-profile`, `/api/auth/login`)
- JSON properties: camelCase (e.g., `firstName`, `createdAt`)
- Database fields: snake_case (e.g., `user_id`, `created_at`)

## Git and Version Control
- Branch names: kebab-case with type prefix (e.g., `feature/user-authentication`, `fix/navigation-bug`)
- Commit messages: Imperative mood, lowercase (e.g., "add user authentication", "fix navigation bug")
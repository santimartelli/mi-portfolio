# TypeScript Standards

Apply industry-leading TypeScript practices based on the latest TypeScript 5+ features and community best practices for exceptional type safety and developer experience.

## Strict Configuration

### TSConfig.json Essential Settings
```json
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false
  }
}
```

### Modern TypeScript Features
- Use `satisfies` operator for better type inference
- Leverage template literal types for API routes
- Use const assertions for immutable data structures
- Employ branded types for domain-specific validation

## Type System Mastery

### Interface vs Type Guidelines
```typescript
// ✅ Use interfaces for extensible object shapes
interface User {
  readonly id: string;
  name: string;
  email: string;
}

// ✅ Use types for unions, mapped types, and computed types
type Status = 'idle' | 'loading' | 'success' | 'error';
type UserKeys = keyof User;
type PartialUser = Partial<User>;
```

### Advanced Type Patterns
```typescript
// Discriminated Unions
type ApiResponse<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
  | { status: 'loading' };

// Branded Types
type UserId = string & { readonly brand: unique symbol };
type EmailAddress = string & { readonly brand: unique symbol };

// Template Literal Types
type EventName<T extends string> = `on${Capitalize<T>}`;
```

### Utility Types Excellence
- `Record<K, V>` for key-value mappings
- `Omit<T, K>` and `Pick<T, K>` for object manipulation
- `ReturnType<T>` and `Parameters<T>` for function types
- `Awaited<T>` for async return types
- `NonNullable<T>` for removing null/undefined

## Generic Programming

### Generic Constraints and Defaults
```typescript
// ✅ Use meaningful constraint names
interface Repository<T extends Entity> {
  findById<K extends keyof T>(id: T[K]): Promise<T | null>;
}

// ✅ Provide sensible defaults
interface ApiClient<TResponse = unknown, TError = ApiError> {
  request: () => Promise<TResponse>;
}
```

### Generic Best Practices
- Use single letter generics (`T`, `K`, `V`) for simple cases
- Use descriptive names for complex generics (`TUser`, `TResponse`)
- Always constrain generics when possible
- Avoid generic overuse - prefer specific types when appropriate

## Type Safety Patterns

### Null Safety and Type Guards
```typescript
// ✅ Use assertion functions
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected string');
  }
}

// ✅ User-defined type guards
function isUser(obj: unknown): obj is User {
  return obj != null && 
    typeof obj === 'object' && 
    'id' in obj && 
    'email' in obj;
}

// ✅ Discriminated unions with type guards
function isErrorResponse(response: ApiResponse): response is ErrorResponse {
  return response.status === 'error';
}
```

### Error Handling Patterns
```typescript
// ✅ Result type pattern
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// ✅ Custom error hierarchies
abstract class AppError extends Error {
  abstract readonly code: string;
}

class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR' as const;
}
```

## Function Excellence

### Function Signatures and Overloads
```typescript
// ✅ Explicit return types for public APIs
export function processUser(user: User): Promise<ProcessedUser> {
  // Implementation
}

// ✅ Function overloads for flexibility
export function createElement(tag: 'div'): HTMLDivElement;
export function createElement(tag: 'span'): HTMLSpanElement;
export function createElement(tag: string): HTMLElement;
export function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}
```

### Async/Await Best Practices
```typescript
// ✅ Proper error handling with typed errors
async function fetchUser(id: UserId): Promise<Result<User, ApiError>> {
  try {
    const response = await api.get(`/users/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof ApiError ? error : new UnknownError(error) 
    };
  }
}
```

## Advanced Patterns

### Module and Namespace Organization
```typescript
// ✅ Use namespace for related types and constants
namespace UserService {
  export interface CreateRequest {
    name: string;
    email: EmailAddress;
  }
  
  export const ENDPOINTS = {
    CREATE: '/api/users',
    UPDATE: '/api/users/:id'
  } as const;
}
```

### Dependency Injection with TypeScript
```typescript
// ✅ Abstract dependencies behind interfaces
interface Logger {
  log(message: string): void;
  error(message: string, error?: Error): void;
}

interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
}

// ✅ Use constructor injection
class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly logger: Logger
  ) {}
}
```

## Performance and Optimization

### Type-only Imports
```typescript
// ✅ Use type-only imports for better tree-shaking
import type { User } from './types/User';
import type { ApiResponse } from './api/types';

// ✅ Regular import only when needed at runtime
import { validateUser } from './utils/validation';
```

### Const Assertions and Immutability
```typescript
// ✅ Use const assertions for immutable data
const THEME_COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745'
} as const;

type ThemeColor = typeof THEME_COLORS[keyof typeof THEME_COLORS];
```

## Testing with TypeScript

### Type Testing
```typescript
// ✅ Test your types with utility types
type test_UserIdIsBranded = Expect<Equal<UserId, string & { brand: unique symbol }>>;
type test_ApiResponseDiscrimination = Expect<Equal<
  ApiResponse<string>['status'],
  'success' | 'error' | 'loading'
>>;
```

### Mock Types
```typescript
// ✅ Create proper mock types
type MockRepository<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? jest.MockedFunction<T[K]>
    : T[K];
};
```

## Declaration Files and Ambient Modules

### Type Augmentation
```typescript
// ✅ Augment existing types safely
declare module '*.svg' {
  const content: string;
  export default content;
}

// ✅ Extend third-party library types
declare module 'some-library' {
  interface SomeInterface {
    newProperty: string;
  }
}
```

## Migration and Adoption Strategy

### Progressive Enhancement
- Start with `@ts-check` in JavaScript files
- Gradually add `.d.ts` files for better types
- Use `// @ts-ignore` sparingly and document why
- Prefer `unknown` over `any` during migration
- Use strict mode incrementally with `// @ts-strict`

### Code Quality Metrics
- Aim for 0% `any` usage in new code
- Maintain >95% type coverage
- Use TypeScript compiler flags to catch more errors
- Implement pre-commit hooks for type checking
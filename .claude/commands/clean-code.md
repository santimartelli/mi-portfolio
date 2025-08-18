# Clean Code Guidelines

Apply Robert C. Martin's Clean Code principles and SOLID design patterns to maintain exceptional code quality across TypeScript, React, Astro, and CSS files.

## SOLID Principles

### Single Responsibility Principle (SRP)
- Each class/function has one reason to change
- Separate concerns: business logic, presentation, data access
- Functions should do one thing exceptionally well
- If you need "and" to describe a function, it's doing too much

### Open/Closed Principle (OCP)
- Open for extension, closed for modification
- Use composition over inheritance
- Leverage TypeScript interfaces and generics
- Design for extensibility without breaking existing code

### Liskov Substitution Principle (LSP)
- Subtypes must be substitutable for their base types
- Maintain behavioral contracts in inheritance hierarchies
- Avoid strengthening preconditions or weakening postconditions

### Interface Segregation Principle (ISP)
- Clients shouldn't depend on interfaces they don't use
- Create focused, cohesive interfaces
- Use TypeScript's interface composition effectively

### Dependency Inversion Principle (DIP)
- Depend on abstractions, not concretions
- Use dependency injection for loose coupling
- Abstract external dependencies behind interfaces

## Naming Excellence

### Variables and Functions
- Use intention-revealing names: `getUsersByActiveStatus()` not `getUsers()`
- Avoid mental mapping: `users` not `u` or `list`
- Use searchable names for important concepts
- Prefer clarity over brevity

### Boolean Variables
- Use positive boolean names: `isVisible` not `isNotHidden`
- Add auxiliary verbs: `canEdit`, `hasPermission`, `shouldRender`
- Avoid negation in boolean names

### Collections and Data
- Use plural nouns for collections: `users`, `orders`, `items`
- Be specific about content: `activeUsers` not `users`
- Use descriptive suffixes: `userMap`, `orderQueue`, `itemStack`

## Function Design

### Function Size and Structure
- Maximum 20 lines per function (aim for 5-10)
- Maximum 3 parameters (use objects for more)
- Single level of abstraction per function
- Stepdown rule: functions read like a narrative

### Error Handling
- Use exceptions, not return codes
- Don't return null - use Optional patterns or throw
- Fail fast with clear error messages
- Handle exceptions at appropriate abstraction levels

### Side Effects
- Functions should do one thing or change one thing, not both
- Command Query Separation: functions either return data or cause side effects
- Mark side effects clearly in function names
- Avoid hidden temporal couplings

## Code Organization

### File Structure
- One primary export per file
- Group related functionality together
- Use barrel exports (index.ts) for clean imports
- Keep file size under 300 lines

### Import Organization
1. Node modules
2. Internal absolute imports
3. Relative imports (parent directories first)
4. Type-only imports separately

### Constants and Configuration
- Use SCREAMING_SNAKE_CASE for constants
- Group related constants in enums or const objects
- Extract magic numbers to named constants
- Use environment variables for configuration

## Comments and Documentation

### When to Comment
- **Why**, not what: Explain business rules and decisions
- **Intent**: Clarify the purpose behind complex algorithms
- **Clarification**: When code must be cryptic due to API constraints
- **Warning**: Alert about consequences or side effects
- **TODO**: Mark temporary solutions with issue numbers

### When NOT to Comment
- Don't comment obvious code
- Don't comment bad code - rewrite it
- Avoid redundant comments that restate the code
- Don't use comments as version control

## Testing Principles

### Test Structure
- AAA Pattern: Arrange, Act, Assert
- One assertion per test (when possible)
- Descriptive test names that explain the scenario
- Test the behavior, not the implementation

### Test Quality
- Tests should be Fast, Independent, Repeatable, Self-validating, Timely (F.I.R.S.T.)
- Write tests that fail for the right reasons
- Use test doubles appropriately (mocks, stubs, fakes)
- Maintain test code with same quality as production code

## Performance and Memory

### Efficient Algorithms
- Choose appropriate data structures
- Consider time/space complexity
- Avoid premature optimization
- Measure before optimizing

### Memory Management
- Avoid memory leaks in event listeners
- Clean up subscriptions and timers
- Use weak references when appropriate
- Consider object pooling for frequent allocations

## Error Prevention

### Defensive Programming
- Validate inputs at boundaries
- Use type guards and assertions
- Handle edge cases explicitly
- Fail fast with meaningful errors

### Code Reviews
- Review for logic, not just syntax
- Look for potential edge cases
- Verify error handling
- Check for performance implications

## Refactoring Strategy

### Red-Green-Refactor Cycle
1. Write failing test (Red)
2. Write minimal code to pass (Green)
3. Improve code structure (Refactor)

### Refactoring Techniques
- Extract Method/Function
- Extract Variable/Constant
- Rename Method/Variable
- Move Method/Field
- Replace Magic Number with Named Constant

### Boy Scout Rule
- Always leave code cleaner than you found it
- Make small improvements continuously
- Fix broken windows immediately
- Invest in code quality daily
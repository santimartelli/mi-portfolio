# React Best Practices

Apply cutting-edge React patterns and practices based on React 18+ features, modern hooks, concurrent features, and industry-leading development patterns.

## Modern Component Architecture

### Functional Components Excellence
```tsx
// ✅ Use function declarations for better debugging
function UserProfile({ userId }: UserProfileProps) {
  // Component logic
}

// ✅ Proper TypeScript prop interface
interface UserProfileProps {
  readonly userId: string;
  onUserUpdate?: (user: User) => void;
  className?: string;
}

// ✅ Default props using ES6 defaults
function Button({ 
  variant = 'primary',
  size = 'medium',
  children,
  ...props 
}: ButtonProps) {
  return <button className={getButtonClass(variant, size)} {...props}>{children}</button>
}
```

### Component Composition Patterns
```tsx
// ✅ Compound Components Pattern
const Modal = ({ children }: { children: React.ReactNode }) => {
  return <div className="modal">{children}</div>
};

Modal.Header = ({ children }: { children: React.ReactNode }) => (
  <header className="modal-header">{children}</header>
);

Modal.Body = ({ children }: { children: React.ReactNode }) => (
  <main className="modal-body">{children}</main>
);

// Usage: <Modal><Modal.Header>Title</Modal.Header><Modal.Body>Content</Modal.Body></Modal>
```

## Advanced Hooks Mastery

### State Management with Modern Hooks
```tsx
// ✅ useReducer for complex state logic
type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type UserAction = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User }
  | { type: 'FETCH_ERROR'; payload: string };

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
```

### Custom Hooks Excellence
```tsx
// ✅ Custom hook with proper TypeScript and error handling
function useUser(userId: string) {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    loading: false,
    error: null
  });

  const fetchUser = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const user = await userService.fetchById(userId);
      dispatch({ type: 'FETCH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { ...state, refetch: fetchUser };
}

// ✅ Generic custom hook
function useAsync<T, E = Error>(asyncFn: () => Promise<T>, deps: React.DependencyList = []) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: E | null;
  }>({ data: null, loading: false, error: null });

  useEffect(() => {
    let isMounted = true;
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    asyncFn()
      .then(data => isMounted && setState({ data, loading: false, error: null }))
      .catch(error => isMounted && setState({ data: null, loading: false, error }));
    
    return () => { isMounted = false; };
  }, deps);

  return state;
}
```

## Performance Optimization

### Memoization Strategies
```tsx
// ✅ React.memo with custom comparison
const UserCard = React.memo(({ user, onUpdate }: UserCardProps) => {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id && 
         prevProps.user.updatedAt === nextProps.user.updatedAt;
});

// ✅ useMemo for expensive calculations
function ExpensiveComponent({ items }: { items: Item[] }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return <div>{expensiveValue}</div>;
}

// ✅ useCallback for stable function references
function TodoList({ todos }: { todos: Todo[] }) {
  const [filter, setFilter] = useState<string>('');
  
  const handleToggle = useCallback((id: string) => {
    // Update logic
  }, []); // Empty deps because it doesn't depend on external values

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => todo.text.includes(filter));
  }, [todos, filter]);

  return (
    <div>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </div>
  );
}
```

### React 18 Concurrent Features
```tsx
// ✅ useDeferredValue for non-urgent updates
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const results = useSearch(deferredQuery);
  
  return (
    <div>
      {query !== deferredQuery && <div>Searching...</div>}
      {results.map(result => <Result key={result.id} {...result} />)}
    </div>
  );
}

// ✅ useTransition for smooth UI updates
function TabContainer() {
  const [tab, setTab] = useState<'posts' | 'contact'>('posts');
  const [isPending, startTransition] = useTransition();

  const selectTab = (nextTab: typeof tab) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div>
      <TabButton 
        isActive={tab === 'posts'}
        onClick={() => selectTab('posts')}
      >
        Posts {isPending && '...'}
      </TabButton>
      {tab === 'posts' ? <PostsTab /> : <ContactTab />}
    </div>
  );
}
```

## State Management Patterns

### Context API Best Practices
```tsx
// ✅ Split context for better performance
interface AuthContextValue {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ✅ Custom provider with error boundaries
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const user = await authService.login(credentials);
      setUser(user);
    } catch (error) {
      throw new AuthError('Failed to login', { cause: error });
    }
  }, []);

  const value = useMemo(() => ({
    user,
    login,
    logout: () => setUser(null)
  }), [user, login]);

  return (
    <ErrorBoundary fallback={<AuthErrorFallback />}>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}

// ✅ Custom hook with proper error handling
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### External State Management
```tsx
// ✅ Zustand store with TypeScript
interface UserStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  loading: false,
  
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const users = await userService.fetchAll();
      set({ users, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  
  addUser: (newUser) => {
    const user = { ...newUser, id: crypto.randomUUID() };
    set(state => ({ users: [...state.users, user] }));
  },
  
  updateUser: (id, updates) => {
    set(state => ({
      users: state.users.map(user => 
        user.id === id ? { ...user, ...updates } : user
      )
    }));
  }
}));
```

## Form Handling Excellence

### Modern Form Patterns
```tsx
// ✅ Custom form hook with validation
function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: (values: T) => Partial<Record<keyof T, string>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name] && validationSchema) {
      const newErrors = validationSchema({ ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  }, [values, touched, validationSchema]);

  const handleSubmit = useCallback((onSubmit: (values: T) => void) => 
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validationSchema) {
        const newErrors = validationSchema(values);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
      }
      onSubmit(values);
    }, [values, validationSchema]);

  return { values, errors, touched, setValue, handleSubmit, setTouched };
}

// ✅ Form component with proper validation
function UserForm({ onSubmit }: { onSubmit: (user: User) => void }) {
  const { values, errors, setValue, handleSubmit } = useForm(
    { name: '', email: '', age: '' },
    (values) => {
      const errors: any = {};
      if (!values.name.trim()) errors.name = 'Name is required';
      if (!values.email.includes('@')) errors.email = 'Invalid email';
      if (!values.age || parseInt(values.age) < 18) errors.age = 'Must be 18+';
      return errors;
    }
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        value={values.name}
        onChange={e => setValue('name', e.target.value)}
        placeholder="Name"
      />
      {errors.name && <span className="error">{errors.name}</span>}
      {/* Other fields */}
    </form>
  );
}
```

## Error Handling and Boundaries

### Modern Error Boundaries
```tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} />;
    }

    return this.props.children;
  }
}

// ✅ Async error handling hook
function useAsyncError() {
  const [, setError] = useState();
  return useCallback((error: Error) => {
    setError(() => { throw error; });
  }, []);
}
```

## Testing Strategies

### Testing Library Best Practices
```tsx
// ✅ Component testing with user interactions
describe('UserProfile', () => {
  it('should display user information and handle updates', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    const mockOnUpdate = jest.fn();

    render(
      <UserProfile 
        user={mockUser} 
        onUpdate={mockOnUpdate} 
      />
    );

    expect(screen.getByDisplayValue(mockUser.name)).toBeInTheDocument();
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, ' Updated');
    
    await user.click(screen.getByRole('button', { name: /save/i }));
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockUser,
      name: 'John Doe Updated'
    });
  });

  it('should handle loading and error states', async () => {
    const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'));
    
    render(<UserProfile userId="1" />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

// ✅ Custom hook testing
function renderHook<T>(hook: () => T) {
  const result = { current: null as T };
  function TestComponent() {
    result.current = hook();
    return null;
  }
  render(<TestComponent />);
  return result;
}
```

## Accessibility Excellence

### ARIA and Semantic HTML
```tsx
// ✅ Accessible form with proper ARIA attributes
function AccessibleForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  return (
    <form role="form" aria-labelledby="form-title">
      <h2 id="form-title">User Registration</h2>
      
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          required
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <div id="email-error" role="alert" className="error">
            {errors.email}
          </div>
        )}
      </div>
      
      <button type="submit" aria-describedby="submit-help">
        Register
      </button>
      <div id="submit-help" className="help-text">
        By clicking Register, you agree to our terms
      </div>
    </form>
  );
}

// ✅ Focus management for modals
function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      {children}
    </div>
  );
}
```
# Tailwind CSS Standards

Apply advanced Tailwind CSS practices with modern utility-first design principles, based on Tailwind CSS v3.4+ features and industry-leading design systems.

## Configuration Excellence

### Modern tailwind.config.js Setup
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' for system preference
  theme: {
    extend: {
      colors: {
        // Semantic color system
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        },
        gray: {
          // Custom gray scale
          50: '#f8fafc',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
}
```

### Content Optimization
```javascript
// ✅ Precise content paths for optimal purging
content: [
  './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  './components/**/*.{js,jsx,ts,tsx}',
  // Include config files that contain classes
  './tailwind.config.{js,cjs,mjs,ts}',
  './src/**/*.astro'
],

// ✅ Safelist critical classes that might be purged
safelist: [
  'bg-red-500',
  'text-3xl',
  'lg:text-4xl',
  // Dynamic classes pattern
  {
    pattern: /bg-(red|green|blue)-(100|200|300)/,
    variants: ['hover', 'focus']
  }
]
```

## Design System Architecture

### Semantic Color System
```css
/* ✅ Define semantic color variables */
:root {
  --color-primary: theme('colors.blue.600');
  --color-primary-hover: theme('colors.blue.700');
  --color-success: theme('colors.green.600');
  --color-error: theme('colors.red.600');
  --color-warning: theme('colors.amber.500');
}

[data-theme='dark'] {
  --color-primary: theme('colors.blue.400');
  --color-primary-hover: theme('colors.blue.300');
}
```

### Component-First Utility Organization
```css
/* ✅ Use @layer for proper CSS cascade */
@layer base {
  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold text-gray-900 dark:text-gray-100;
  }
  
  body {
    @apply bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded-md font-medium transition-colors;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700;
    @apply focus:ring-primary-500 disabled:opacity-50;
  }
  
  .card {
    @apply bg-white dark:bg-gray-800 shadow-lg rounded-lg;
    @apply border border-gray-200 dark:border-gray-700;
  }
}

@layer utilities {
  .scrollbar-none {
    scrollbar-width: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
}
```

## Modern Utility Patterns

### Responsive Design Excellence
```html
<!-- ✅ Mobile-first responsive design -->
<div class="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-3 lg:gap-8
  xl:grid-cols-4
">
  <!-- Content -->
</div>

<!-- ✅ Container queries for component-based responsive design -->
<div class="@container">
  <div class="@lg:flex @lg:items-center @lg:gap-4">
    <!-- Content adapts to container size, not viewport -->
  </div>
</div>

<!-- ✅ Logical properties for international layouts -->
<div class="ps-4 pe-6 ms-2 me-auto">
  <!-- Uses start/end instead of left/right -->
</div>
```

### Advanced Layout Patterns
```html
<!-- ✅ Modern CSS Grid patterns -->
<div class="
  grid grid-cols-[200px_1fr_200px] 
  grid-rows-[auto_1fr_auto] 
  min-h-screen
">
  <header class="col-span-3">Header</header>
  <aside class="bg-gray-50">Sidebar</aside>
  <main class="p-6">Main Content</main>
  <aside class="bg-gray-50">Right Sidebar</aside>
  <footer class="col-span-3">Footer</footer>
</div>

<!-- ✅ Flexbox with gap utilities -->
<div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
  <div class="flex-1">Content 1</div>
  <div class="flex-1">Content 2</div>
</div>

<!-- ✅ Aspect ratio with modern utilities -->
<div class="aspect-video bg-gray-200 rounded-lg overflow-hidden">
  <img src="..." class="w-full h-full object-cover" alt="..." />
</div>
```

### State Management with Variants
```html
<!-- ✅ Comprehensive state variants -->
<button class="
  btn btn-primary
  hover:shadow-lg hover:scale-105
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  motion-safe:transition-all motion-safe:duration-200
  motion-reduce:transition-none
">
  Click me
</button>

<!-- ✅ Group hover effects -->
<div class="group hover:bg-blue-50 p-4 rounded-lg transition-colors">
  <h3 class="group-hover:text-blue-900">Title</h3>
  <p class="group-hover:text-blue-700">Description</p>
  <button class="opacity-0 group-hover:opacity-100 transition-opacity">
    Action
  </button>
</div>

<!-- ✅ Peer state interactions -->
<div class="flex items-center space-x-3">
  <input type="checkbox" class="peer" id="terms" />
  <label 
    for="terms" 
    class="peer-checked:text-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500"
  >
    I agree to terms
  </label>
</div>
```

## Dark Mode Implementation

### Comprehensive Dark Mode Strategy
```html
<!-- ✅ Semantic dark mode classes -->
<div class="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border border-gray-200 dark:border-gray-700
  shadow-lg dark:shadow-gray-900/25
">
  <h2 class="text-gray-900 dark:text-gray-100">Title</h2>
  <p class="text-gray-600 dark:text-gray-400">Description</p>
</div>

<!-- ✅ Dark mode with color variations -->
<button class="
  bg-blue-600 hover:bg-blue-700
  dark:bg-blue-500 dark:hover:bg-blue-400
  text-white dark:text-blue-50
">
  Action
</button>
```

### JavaScript Dark Mode Toggle
```javascript
// ✅ Robust dark mode implementation
class DarkModeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.apply();
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.apply();
    localStorage.setItem('theme', this.theme);
  }

  apply() {
    const root = document.documentElement;
    root.classList.toggle('dark', this.theme === 'dark');
    root.style.colorScheme = this.theme;
  }
}
```

## Performance Optimization

### Bundle Size Optimization
```javascript
// ✅ Purge unused styles effectively
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,astro}'],
  plugins: [
    // Remove unused CSS more aggressively
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
      safelist: {
        standard: ['html', 'body'],
        deep: [/^toast-/, /^modal-/],
        greedy: [/^bg-/, /^text-/]
      }
    })
  ]
}
```

### Critical CSS Strategy
```html
<!-- ✅ Inline critical styles -->
<style>
  /* Critical above-the-fold styles */
  .hero { @apply bg-blue-600 text-white py-20; }
  .nav { @apply bg-white shadow-sm; }
</style>

<!-- ✅ Lazy load non-critical styles -->
<link 
  rel="stylesheet" 
  href="/styles/components.css" 
  media="print" 
  onload="this.media='all'"
>
```

## Accessibility Excellence

### Accessible Color Contrasts
```css
/* ✅ Ensure proper contrast ratios */
:root {
  /* WCAG AA compliant colors */
  --text-primary: #1f2937; /* 4.5:1 contrast */
  --text-secondary: #6b7280; /* 4.5:1 contrast */
  --link-color: #2563eb; /* 4.5:1 contrast */
}
```

### Focus Management
```html
<!-- ✅ Comprehensive focus styles -->
<button class="
  focus:outline-none 
  focus:ring-2 
  focus:ring-blue-500 
  focus:ring-offset-2
  focus-visible:ring-2
  focus-visible:ring-blue-500
  focus:not(:focus-visible):ring-0
">
  Accessible Button
</button>

<!-- ✅ Skip links for keyboard navigation -->
<a href="#main-content" class="
  sr-only 
  focus:not-sr-only 
  focus:absolute 
  focus:top-4 
  focus:left-4 
  focus:z-50
  focus:px-4 
  focus:py-2 
  focus:bg-blue-600 
  focus:text-white 
  focus:rounded-md
">
  Skip to main content
</a>
```

## Animation and Transitions

### Motion-Safe Animations
```html
<!-- ✅ Respect user motion preferences -->
<div class="
  transform transition-all duration-300 ease-out
  motion-safe:hover:scale-105 motion-safe:hover:shadow-lg
  motion-reduce:transition-none motion-reduce:transform-none
">
  Content with respectful motion
</div>

<!-- ✅ Custom animation utilities -->
<div class="animate-fade-in-up">
  Smoothly animated content
</div>
```

### Micro-Interactions
```css
/* ✅ Delightful micro-interactions */
@layer components {
  .btn-interactive {
    @apply transform transition-all duration-200 ease-out;
    @apply hover:scale-105 hover:shadow-lg;
    @apply active:scale-95;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .card-interactive {
    @apply transform transition-all duration-300 ease-out;
    @apply hover:-translate-y-1 hover:shadow-xl;
  }
}
```

## Advanced Patterns

### Component Variants with CVA
```typescript
// ✅ Class Variance Authority for component variants
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary'
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### CSS-in-JS Integration
```tsx
// ✅ Tailwind with CSS-in-JS libraries
import { styled } from '@stitches/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Component with conditional classes
function Card({ variant = 'default', className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        {
          'border-destructive': variant === 'destructive',
          'border-warning': variant === 'warning'
        },
        className
      )}
      {...props}
    />
  );
}
```
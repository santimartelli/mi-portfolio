# Astro Development Guidelines

Apply advanced Astro 4+ patterns and best practices for modern static site generation with Islands Architecture, optimal performance, and exceptional developer experience.

## Astro Islands Architecture

### Island Hydration Strategies
```astro
---
// ✅ Strategic component hydration
import Header from '../components/Header.astro';
import SearchBox from '../components/SearchBox.tsx';
import ProductGrid from '../components/ProductGrid.tsx';
import Newsletter from '../components/Newsletter.tsx';
---

<Layout title="Products">
  <!-- Server-rendered, no JS needed -->
  <Header />
  
  <!-- Load immediately for core functionality -->
  <SearchBox client:load />
  
  <!-- Lazy load when visible for better performance -->
  <ProductGrid client:visible />
  
  <!-- Load only when user interacts -->
  <Newsletter client:idle />
  
  <!-- Load only on specific media query -->
  <ChatWidget client:media="(min-width: 768px)" />
</Layout>
```

### Advanced Client Directives
```astro
---
// ✅ Conditional hydration based on user preferences
const isInteractive = Astro.cookies.get('prefer-interactive')?.value === 'true';
---

<!-- Conditional client-side rendering -->
{isInteractive ? (
  <InteractiveComponent client:load />
) : (
  <StaticComponent />
)}

<!-- Pass server data to client components -->
<WeatherWidget 
  client:load 
  initialData={weatherData}
  userLocation={Astro.locals.location}
/>
```

## Component Architecture

### Astro Component Best Practices
```astro
---
// ✅ Proper TypeScript interfaces for props
export interface Props {
  readonly title: string;
  readonly description?: string;
  readonly tags?: readonly string[];
  readonly publishDate: Date;
  readonly featured?: boolean;
}

const { 
  title, 
  description, 
  tags = [], 
  publishDate, 
  featured = false 
} = Astro.props;

// ✅ Server-side data fetching
const relatedPosts = await getRelatedPosts(tags);

// ✅ SEO optimization
const seoTitle = `${title} | Your Site Name`;
const seoDescription = description || `Read about ${title}`;
---

<!-- ✅ Semantic HTML structure -->
<article class="prose prose-lg mx-auto" itemscope itemtype="https://schema.org/BlogPosting">
  <header>
    <h1 itemprop="headline">{title}</h1>
    {description && (
      <p class="text-xl text-gray-600 mt-4" itemprop="description">
        {description}
      </p>
    )}
    <time 
      datetime={publishDate.toISOString()} 
      itemprop="datePublished"
      class="text-sm text-gray-500"
    >
      {publishDate.toLocaleDateString()}
    </time>
  </header>
  
  <div itemprop="articleBody">
    <slot />
  </div>
  
  {tags.length > 0 && (
    <footer class="mt-8">
      <div class="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </footer>
  )}
</article>

<!-- ✅ Structured data for SEO -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": seoDescription,
    "datePublished": publishDate.toISOString(),
    "author": {
      "@type": "Person",
      "name": "Author Name"
    }
  }
</script>

<style>
/* ✅ Scoped styles with CSS variables */
article {
  --prose-headings: theme('colors.gray.900');
  --prose-links: theme('colors.blue.600');
}

@media (prefers-color-scheme: dark) {
  article {
    --prose-headings: theme('colors.gray.100');
    --prose-links: theme('colors.blue.400');
  }
}
</style>
```

### Layout System
```astro
---
// ✅ Base layout with proper meta tags and performance optimizations
export interface Props {
  readonly title: string;
  readonly description?: string;
  readonly image?: string;
  readonly noindex?: boolean;
}

const canonicalURL = new URL(Astro.url.pathname, Astro.site);

const {
  title,
  description = 'Default site description',
  image = '/og-default.jpg',
  noindex = false
} = Astro.props;

const imageURL = new URL(image, Astro.url);
---

<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    
    <!-- ✅ SEO optimization -->
    <title>{title}</title>
    <link rel="canonical" href={canonicalURL} />
    {noindex && <meta name="robots" content="noindex" />}
    
    <!-- ✅ Open Graph tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={Astro.url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageURL} />
    
    <!-- ✅ Twitter Card tags -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={Astro.url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={imageURL} />
    
    <!-- ✅ Performance optimizations -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="dns-prefetch" href="https://analytics.google.com" />
    
    <!-- ✅ Theme detection script (inline to prevent FOUC) -->
    <script is:inline>
      const theme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    </script>
  </head>
  
  <body class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <slot />
    
    <!-- ✅ Service Worker registration -->
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
      }
    </script>
  </body>
</html>
```

## Content Collections

### Type-Safe Content Management
```typescript
// ✅ Content collection schemas (src/content/config.ts)
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    author: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    }).optional(),
    draft: z.boolean().default(false)
  })
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0)
  })
});

export const collections = {
  'blog': blogCollection,
  'projects': projectsCollection
};
```

### Content Queries and Filtering
```astro
---
// ✅ Advanced content queries
import { getCollection } from 'astro:content';

// Get all published blog posts, sorted by date
const allPosts = await getCollection('blog', ({ data }) => {
  return !data.draft;
});

const sortedPosts = allPosts.sort((a, b) => 
  b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
);

// Get featured posts
const featuredPosts = await getCollection('blog', ({ data }) => 
  data.featured && !data.draft
);

// Get posts by tag
const tag = Astro.params.tag;
const taggedPosts = await getCollection('blog', ({ data }) => 
  data.tags.includes(tag) && !data.draft
);

// Get related posts
const currentSlug = Astro.params.slug;
const currentPost = await getEntry('blog', currentSlug);
const relatedPosts = await getCollection('blog', ({ data, slug }) => {
  return slug !== currentSlug && 
         data.tags.some(tag => currentPost.data.tags.includes(tag)) &&
         !data.draft;
}).then(posts => posts.slice(0, 3));
---
```

## API Routes and Middleware

### Modern API Routes
```typescript
// ✅ API route with proper TypeScript (src/pages/api/newsletter.ts)
import type { APIRoute } from 'astro';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50)
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate input
    const result = subscribeSchema.safeParse(data);
    if (!result.success) {
      return new Response(JSON.stringify({
        error: 'Invalid input',
        details: result.error.errors
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const { email, name } = result.data;
    
    // Process subscription (integrate with email service)
    await subscribeToNewsletter(email, name);
    
    return new Response(JSON.stringify({
      message: 'Successfully subscribed!',
      email
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
```

### Middleware for Authentication and Security
```typescript
// ✅ Middleware (src/middleware.ts)
import { defineMiddleware } from 'astro/middleware';
import { verifyJWT } from './utils/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  // Security headers
  context.locals.securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };
  
  // Authentication for protected routes
  if (context.url.pathname.startsWith('/admin')) {
    const token = context.cookies.get('auth-token')?.value;
    
    if (!token) {
      return context.redirect('/login');
    }
    
    try {
      const user = await verifyJWT(token);
      context.locals.user = user;
    } catch (error) {
      context.cookies.delete('auth-token');
      return context.redirect('/login');
    }
  }
  
  // Rate limiting
  const ip = context.clientAddress;
  const rateLimitResult = await checkRateLimit(ip);
  
  if (!rateLimitResult.allowed) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String(rateLimitResult.retryAfter)
      }
    });
  }
  
  const response = await next();
  
  // Apply security headers
  Object.entries(context.locals.securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
});
```

## Performance Optimization

### Image Optimization
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- ✅ Optimized images with proper sizing -->
<Image
  src={heroImage}
  alt="Hero description"
  width={800}
  height={600}
  loading="eager"
  decoding="async"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>

<!-- ✅ Lazy loaded images below the fold -->
<Image
  src={productImage}
  alt="Product description"
  width={400}
  height={300}
  loading="lazy"
  decoding="async"
/>
```

### Code Splitting and Bundle Optimization
```astro
---
// ✅ Dynamic imports for better code splitting
const isInteractive = Astro.cookies.get('interactive')?.value === 'true';
---

{isInteractive && (
  <script>
    // Dynamic import for conditional functionality
    import('./interactive-features.js').then(module => {
      module.initializeFeatures();
    });
  </script>
)}
```

## Build Configuration

### Advanced Astro Config
```javascript
// ✅ Production-optimized astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://yoursite.com',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false // Use custom base styles
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    }),
    compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
        caseSensitive: true
      },
      Image: false, // Use Astro's built-in image optimization
      JavaScript: true,
      SVG: true
    })
  ],
  output: 'static', // or 'server' for SSR
  adapter: undefined, // Add adapter for SSR
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['lodash', 'date-fns']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@astrojs/react']
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    },
    remarkPlugins: [
      'remark-gfm',
      ['remark-toc', { heading: 'contents' }]
    ],
    rehypePlugins: [
      'rehype-slug',
      ['rehype-autolink-headings', { behavior: 'wrap' }]
    ]
  },
  experimental: {
    contentCollectionCache: true
  }
});
```

## Testing and Quality Assurance

### Component Testing
```typescript
// ✅ Testing Astro components
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Card from '../src/components/Card.astro';

test('Card renders with correct props', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Card, {
    props: {
      title: 'Test Title',
      description: 'Test Description'
    }
  });

  expect(result).toContain('Test Title');
  expect(result).toContain('Test Description');
});
```

### End-to-End Testing
```typescript
// ✅ E2E tests with Playwright
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check for critical elements
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('nav')).toBeVisible();
  
  // Test interactive components
  await page.click('[data-testid="theme-toggle"]');
  await expect(page.locator('html')).toHaveClass(/dark/);
  
  // Performance assertions
  const performanceTiming = JSON.parse(
    await page.evaluate(() => JSON.stringify(performance.timing))
  );
  
  const loadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
  expect(loadTime).toBeLessThan(3000); // Less than 3 seconds
});
```

## Deployment and CI/CD

### GitHub Actions Workflow
```yaml
# ✅ Optimized build and deployment
name: Deploy Astro Site

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run type checking
        run: npm run astro check
      
      - name: Build site
        run: npm run build
        
      - name: Upload build artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
```
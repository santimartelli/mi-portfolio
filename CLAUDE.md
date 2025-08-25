# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual personal portfolio website for Santiago Martelli built with Astro, React, TypeScript, and Tailwind CSS. The site showcases projects, skills, and contact information in a modern, responsive design with full internationalization support for Spanish and English.

### Live Site
- **Production URL**: [https://www.martelli.dev](https://www.martelli.dev)
- **Repository**: [GitHub](https://github.com/santimartelli/mi-portfolio.git)

### Project Goals
- **Professional Showcase**: Display technical skills and featured projects
- **Bilingual Accessibility**: Full Spanish/English internationalization
- **Modern Performance**: Fast loading, responsive design, SEO optimized
- **Technical Excellence**: Clean code architecture demonstrating best practices

## Development Commands

### Essential Commands
- `npm run dev` or `npm start` - Start development server at http://localhost:4321
- `npm run build` - Build for production (includes Astro type checking)
- `npm run preview` - Preview production build locally
- `astro check` - Run Astro's built-in type checking

### Quality Assurance
- **Type Checking**: Run `astro check` before committing changes
- **Build Verification**: Always run `npm run build` to ensure production readiness
- **Local Testing**: Use `npm run preview` to test production build locally

### Development Workflow
1. Start dev server: `npm run dev`
2. Make changes and verify in browser
3. Run type checking: `astro check`
4. Build for production: `npm run build`
5. Preview production build: `npm run preview`

## Architecture

### Core Technologies

- **Astro**: Static site generator with islands architecture and i18n routing
- **React**: Component framework for interactive elements
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS**: Utility-first CSS framework with custom theme
- **Framer Motion**: Animation library for React components

### Project Structure

```
src/
├── agents/             # AI agent configurations
│   └── design-review-agent.md  # Design review automation
├── components/         # React components (.tsx files)
│   ├── *WithTranslations.tsx  # Internationalized components
│   ├── Modal.tsx      # Project detail modal
│   ├── NavControls.tsx # Theme and language controls
│   └── *.tsx         # Base components
├── content/           # Translation JSON files
│   ├── es/           # Spanish translations (hero, navbar, projects, etc.)
│   └── en/           # English translations (hero, navbar, projects, etc.)
├── context/           # Design and development guidelines
│   ├── design-principles.md  # Comprehensive design checklist
│   └── style-guide.md       # Brand style guide and component specs
├── icons/             # Custom icon components (.astro)
│   ├── Curriculum.astro     # CV download icon
│   ├── GitHub.astro         # GitHub profile icon
│   └── LinkedIn.astro       # LinkedIn profile icon
├── layouts/           # Astro layouts
│   └── Layout.astro  # Base HTML layout with meta tags, analytics
├── pages/             # Astro pages (routes)
│   ├── index.astro   # Spanish main page (default route)
│   ├── en/index.astro # English main page (/en/ route)
│   └── feedbackemail.astro # Contact form submission handler
├── styles/            # Custom CSS files
│   ├── navbar.css    # Navigation-specific styles
│   └── projects-cards.css # Project card animations
└── util/              # Utility hooks and functions
    ├── i18n.tsx      # Translation context and TypeScript interfaces
    ├── ThemeContext.tsx # Dark/light theme state management
    ├── useActiveSection.ts # Scroll-based navigation highlighting
    ├── useForm.ts    # Form handling utilities
    ├── useMediaQuery.tsx # Responsive breakpoint detection
    └── useTheme.ts   # Theme switching logic
```

### File Organization Principles
- **Co-location**: Related files grouped by feature/domain
- **Clear Naming**: Descriptive file names indicating purpose
- **Separation of Concerns**: Logic, styling, and content separated
- **Scalability**: Structure supports easy addition of new features

### Internationalization System

- **Astro i18n Config**: Routes configured for Spanish (default) and English
- **Translation Components**: Components with "WithTranslations" suffix handle localized content
- **Type-Safe Translations**: Complete TypeScript interfaces for all translation structures
- **JSON-based Content**: Translations stored in `src/content/{locale}/` directories
- **Context-based Translation**: React Context provides translations to components

### Component Architecture

- **Astro Islands**: React components loaded with `client:*` directives
  - `client:load` - Load immediately (navbar, critical UI)
  - `client:visible` - Load when entering viewport (sections)
- **Translation Pattern**: Base components wrapped by translation-aware versions
- **Theme System**: Global dark/light theme with React Context
- **Modal System**: Projects use overlay modals for detailed views

### Styling System

- **Dynamic Theme System**: CSS variables that adapt between dark/light modes
  - `--bg-primary/secondary/tertiary`: Background hierarchy
  - `--text-primary/secondary/tertiary`: Text color hierarchy  
  - `--accent/accent-hover`: Professional blue accent colors
  - `--border-primary/secondary`: Border color variants
- **Custom Tailwind Extension**: Enhanced with project-specific design tokens
  - `darkbg-950/900`: Deep background colors
  - `darktext-300/400`: Light text variants
  - `accent-400/500`: Teal accent colors (legacy)
- **Professional Color Palette**: Clean, modern aesthetic
  - Dark Mode: Deep blues and grays with blue accents
  - Light Mode: Pure whites and soft grays with darker blue accents
- **Animation Library**: Performance-optimized micro-interactions
  - `fadeIn`, `imageHover`, `enterUp`: Entrance animations
  - `pulse-slow`, `blink`: Attention-drawing effects
- **Typography Stack**: Multi-font system for hierarchy
  - **Primary**: Titillium Web (display and body)
  - **Secondary**: Inter Variable (modern sans-serif)
  - **Monospace**: Geist Mono, Fira Code Variable (code)
- **Component Styles**: Modular CSS in src/styles/
  - `navbar.css`: Navigation-specific styles
  - `projects-cards.css`: Project gallery animations

### State Management

- **Theme Context**: Global dark/light mode state
- **Translation Context**: Locale-specific content delivery
- **Local State**: React hooks for component-specific state
- **Custom Hooks**: Utilities for media queries, forms, and active sections

## Key Development Notes

### Code Quality Standards
- **TypeScript First**: All React components use comprehensive type definitions
- **Type-Safe Translations**: Translation interfaces ensure compile-time safety
- **Strict Type Checking**: Zero TypeScript errors policy
- **Component Props**: All props properly typed with interfaces

### Performance Optimization
- **Astro Islands**: Strategic use of `client:*` directives
  - `client:load`: Critical UI (navbar, theme controls)
  - `client:visible`: Sections that load on scroll
  - Minimize JavaScript bundle size
- **Image Optimization**: WebP format, lazy loading, responsive srcset
- **Font Loading**: Preload critical fonts, font-display: swap
- **Build Process**: Automatic type checking via `astro check`

### User Experience
- **Theme Persistence**: Dark/light mode persists across sessions via localStorage
- **Scroll Restoration**: Maintains position during language switching
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Accessibility**: WCAG AA compliance, keyboard navigation, screen reader support

### Internationalization
- **Route Handling**: Automatic locale prefixing (Spanish default, /en/ for English)
- **Content Management**: JSON-based translations with TypeScript interfaces
- **Context Delivery**: React Context provides translations to all components
- **SEO Optimization**: Proper hreflang tags and meta descriptions per locale

## Claude Code MCP Integration

### Playwright MCP

This project has access to Playwright MCP for browser automation and testing:

- **Browser Control**: Navigate, click, type, and interact with web pages
- **Visual Testing**: Take screenshots and capture page snapshots for verification
- **Form Testing**: Fill forms and test interactive elements
- **Responsive Testing**: Resize browser and test different viewport sizes
- **Console Monitoring**: Monitor console messages and network requests

Use Playwright MCP tools (prefixed with `mcp__playwright__`) for:

- Testing the portfolio website functionality
- Verifying responsive design across different screen sizes
- Testing theme switching and language switching
- Validating contact form behavior
- Ensuring proper navigation and modal interactions

### Context and Agent Management

- **Task Agent**: Use for complex multi-step tasks that require autonomous operation
- **General Purpose Agent**: Best for researching complex questions and executing multi-step tasks
- **Context Management**: Batch tool calls when possible for optimal performance
- **Task Breakdown**: Use TodoWrite tool to plan and track complex implementations

## Visual Development

### Design Principles

- Comprehensive design checklist in `/context/design-principles.md`
- Brand style guide in `/context/style-guide.md`
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

### Quick Visual Check

IMMEDIATELY after implementing any front-end change:

1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/context/design-principles.md` and `/context/style-guide.md`
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review

Invoke the `@agent-design-review` subagent for thorough design validation when:

- Completing significant UI/UX features
- Before finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing

## Best Practices & Guidelines

### Component Development
- **Single Responsibility**: Each component has one clear purpose
- **Props Interface**: Always define TypeScript interfaces for props
- **Error Boundaries**: Handle errors gracefully with fallback UI
- **Memoization**: Use React.memo for components with expensive renders
- **Hooks Pattern**: Custom hooks for reusable stateful logic

### Styling Guidelines
- **Design Tokens**: Use CSS variables for consistent theming
- **Utility Classes**: Prefer Tailwind utilities over custom CSS
- **Component Variants**: Use theme-* classes for consistent styling
- **Mobile First**: Design and code for mobile, enhance for desktop
- **Performance**: Minimize CSS bundle size, avoid unused styles

### Content Management
- **Translation Keys**: Use descriptive, hierarchical keys
- **Content Validation**: Ensure all translations have matching keys
- **SEO Content**: Include meta descriptions and titles in translations
- **Image Assets**: Optimize and provide multiple formats (WebP, fallbacks)

### Testing Strategy
- **Type Safety**: Use TypeScript to catch errors at compile time
- **Build Verification**: Always test production builds locally
- **Cross-Browser**: Test in Chrome, Firefox, Safari, Edge
- **Performance**: Monitor Core Web Vitals and lighthouse scores
- **Accessibility**: Test with screen readers and keyboard navigation

### Deployment Checklist
- [ ] All TypeScript errors resolved (`astro check`)
- [ ] Production build successful (`npm run build`)
- [ ] Images optimized and properly sized
- [ ] Meta tags and SEO content updated
- [ ] Performance metrics within targets
- [ ] Cross-browser compatibility verified
- [ ] Accessibility standards met (WCAG AA)
- [ ] Content accuracy in both languages

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual personal portfolio website for Santiago Martelli built with Astro, React, TypeScript, and Tailwind CSS. The site showcases projects, skills, and contact information in a modern, responsive design with full internationalization support for Spanish and English.

## Development Commands

- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production (includes Astro type checking)
- `npm run preview` - Preview production build locally
- `astro check` - Run Astro's built-in type checking

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
├── components/          # React components (.tsx files)
│   ├── *WithTranslations.tsx  # Internationalized components
│   ├── Modal.tsx       # Project detail modal
│   ├── NavControls.tsx # Theme and language controls
│   └── *.tsx          # Base components
├── content/            # Translation JSON files
│   ├── es/            # Spanish translations
│   └── en/            # English translations
├── layouts/            # Astro layouts
│   └── Layout.astro   # Base HTML layout with meta tags
├── pages/              # Astro pages (routes)
│   ├── index.astro    # Spanish main page (default)
│   ├── en/index.astro # English main page
│   └── feedbackemail.astro # Contact form handler
├── icons/              # Custom icon components (.astro)
├── styles/             # Custom CSS files
└── util/               # Utility hooks and functions
    ├── i18n.tsx       # Translation context and types
    ├── ThemeContext.tsx # Dark/light theme context
    └── *.ts           # Custom hooks and utilities
```

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
- **Custom Tailwind Theme**: Extended with project-specific colors
  - `darkbg`: Dark background variants (950, 900)
  - `darktext`: Light text for dark mode (300)
  - `accent`: Teal accent colors (400, 500)
- **Custom Animations**: Fade effects, hover states, and entrance animations
- **Font System**: Multiple web fonts via Fontsource
- **CSS Modules**: Component-specific styles in src/styles/

### State Management
- **Theme Context**: Global dark/light mode state
- **Translation Context**: Locale-specific content delivery
- **Local State**: React hooks for component-specific state
- **Custom Hooks**: Utilities for media queries, forms, and active sections

## Key Development Notes

- All React components use TypeScript with comprehensive type definitions
- Translation interfaces ensure type safety across all localized content
- Interactive elements require appropriate `client:*` directives in Astro
- The build process includes automatic type checking via `astro check`
- Theme switching persists across page reloads via localStorage
- Routes automatically handle locale prefixing (Spanish default, /en/ for English)

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
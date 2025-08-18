# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Santiago Martelli built with Astro, React, TypeScript, and Tailwind CSS. The site showcases projects, skills, and contact information in a modern, responsive design.

## Development Commands

- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production (includes Astro type checking)
- `npm run preview` - Preview production build locally
- `astro check` - Run Astro's built-in type checking

## Architecture

### Core Technologies
- **Astro**: Static site generator with islands architecture
- **React**: Component framework for interactive elements
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React components

### Project Structure
```
src/
├── components/          # React components (.tsx files)
│   ├── Hero.tsx        # Main hero section
│   ├── AboutMe.tsx     # About section
│   ├── Projects.tsx    # Projects showcase
│   ├── Contact.tsx     # Contact form
│   ├── Navbar.tsx      # Navigation
│   └── Modal.tsx       # Project detail modal
├── layouts/            # Astro layouts
│   └── Layout.astro    # Base HTML layout with meta tags
├── pages/              # Astro pages (routes)
│   ├── index.astro     # Main page with all sections
│   └── feedbackemail.astro # Contact form handler
├── icons/              # Custom icon components (.astro)
├── styles/             # Custom CSS files
└── util/               # Utility hooks and functions
```

### Component Architecture
- **Astro Islands**: React components are loaded with `client:*` directives
  - `client:load` - Load immediately
  - `client:visible` - Load when component enters viewport
- **Section-based Layout**: Single-page application with sections for each content area
- **Modal System**: Projects use a modal overlay for detailed views
- **Responsive Design**: Tailwind CSS classes with custom breakpoints

### Styling System
- **Custom Tailwind Theme**: Extended with custom colors (darkbg, darktext variants)
- **Global Styles**: CSS reset and typography in Layout.astro
- **Component-specific CSS**: Additional styles in src/styles/ directory
- **Font Loading**: Multiple web fonts loaded via Fontsource

### State Management
- React hooks for local component state
- Custom hooks in src/util/ for reusable logic
- No global state management system

## Key Development Notes

- All React components use TypeScript with proper type definitions
- Astro components handle server-side rendering and layout
- Interactive elements require `client:*` directives in Astro
- The build process includes automatic type checking via `astro check`
- Custom CSS variables and Tailwind utilities work together for theming
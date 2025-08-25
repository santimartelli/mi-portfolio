# Santiago Martelli Portfolio - Style Guide

## Brand Identity & Core Philosophy

### **Design Principles**
- **Profesionalismo Limpio**: Estética moderna y refinada que refleja competencia técnica
- **Claridad Visual**: Comunicación directa sin elementos innecesarios
- **Experiencia Fluida**: Interacciones suaves y intuitivas
- **Accesibilidad Universal**: Diseño inclusivo que funciona para todos los usuarios

---

## Color System

### **Theme Architecture**
El portfolio utiliza un sistema de temas dinámico con variables CSS que se adapta automáticamente entre modo oscuro y claro.

#### **Dark Mode (Default)**
```css
/* Backgrounds */
--bg-primary: #0a0b0f        /* Fondo principal profundo */
--bg-secondary: #151821      /* Fondo secundario */
--bg-tertiary: #1f2937       /* Fondo de tarjetas */
--bg-hover: #374151          /* Estados hover */

/* Text Colors */
--text-primary: #f8fafc      /* Texto principal */
--text-secondary: #e2e8f0    /* Texto normal */
--text-tertiary: #cbd5e1     /* Texto secundario */
--text-muted: #94a3b8        /* Texto deshabilitado */

/* Accent Colors */
--accent: #3b82f6            /* Azul profesional */
--accent-hover: #2563eb      /* Azul hover */
--accent-secondary: #06b6d4  /* Cian moderno */
```

#### **Light Mode**
```css
/* Backgrounds */
--bg-primary: #ffffff        /* Fondo principal puro */
--bg-secondary: #f8fafc      /* Fondo secundario */
--bg-tertiary: #f1f5f9       /* Fondo de tarjetas */

/* Text Colors */
--text-primary: #0f172a      /* Texto principal oscuro */
--text-secondary: #334155    /* Texto normal */
--text-tertiary: #475569     /* Texto secundario */

/* Accent Colors */
--accent: #2563eb            /* Azul más oscuro */
--accent-hover: #1d4ed8      /* Azul hover más oscuro */
```

### **Color Usage Guidelines**
- **Accent Colors**: Usar con moderación para CTAs, enlaces y elementos interactivos
- **Neutral Palette**: Base para todo el contenido de texto y fondos
- **High Contrast**: Asegurar contraste mínimo WCAG AA (4.5:1)

---

## Typography System

### **Font Hierarchy**
```css
/* Primary Font Stack */
font-family: "Titillium Web", "Inter Variable", system-ui, sans-serif;

/* Display Fonts */
font-family: "Inter Variable", system-ui, sans-serif; /* Para títulos grandes */

/* Code/Technical */
font-family: "Geist Mono", "Fira Code Variable", monospace;
```

### **Type Scale**
```css
/* Headings */
.text-4xl    /* H1: 36px - Hero titles */
.text-3xl    /* H2: 30px - Section headings */
.text-2xl    /* H3: 24px - Subsection headings */
.text-xl     /* H4: 20px - Card titles */

/* Body Text */
.text-lg     /* Large: 18px - Hero subtitles */
.text-base   /* Normal: 16px - Body text (default) */
.text-sm     /* Small: 14px - Captions, metadata */
.text-xs     /* Tiny: 12px - Labels, badges */
```

### **Font Weight System**
- **font-light (300)**: Texto delicado, subtítulos largos
- **font-normal (400)**: Texto base, párrafos
- **font-medium (500)**: Énfasis sutil, enlaces
- **font-semibold (600)**: Títulos de sección, botones
- **font-bold (700)**: Títulos principales, elementos destacados

### **Line Height Rules**
- **Headings**: 1.2-1.3 (tight spacing)
- **Body Text**: 1.6-1.7 (comfortable reading)
- **Captions**: 1.4-1.5 (compact but readable)

---

## Spacing & Layout

### **Spacing Scale (8px base unit)**
```css
/* Tailwind Classes */
.p-1     /* 4px */
.p-2     /* 8px */
.p-3     /* 12px */
.p-4     /* 16px */
.p-6     /* 24px */
.p-8     /* 32px */
.p-12    /* 48px */
.p-16    /* 64px */
.p-20    /* 80px */
.p-24    /* 96px */
```

### **Layout Guidelines**
- **Section Padding**: py-16 lg:py-24 (64px-96px vertical)
- **Container Max Width**: max-w-7xl (1280px)
- **Content Margins**: mx-auto px-4 sm:px-6 lg:px-8
- **Card Spacing**: p-6 lg:p-8 (24px-32px internal)
- **Element Spacing**: space-y-4 lg:space-y-6 (16px-24px between elements)

### **Grid System**
```css
/* Responsive Grids */
.grid-cols-1 md:grid-cols-2 lg:grid-cols-3  /* Cards/Projects */
.grid-cols-1 lg:grid-cols-2                /* Two-column sections */
gap-6 lg:gap-8                             /* Consistent gap spacing */
```

---

## Component Styling

### **Buttons**
```css
/* Primary Button */
.theme-button-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  color: white;
  border-radius: 12px;
  font-weight: 600;
  padding: 12px 24px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

/* Secondary Button */
.theme-button-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1.5px solid color-mix(in srgb, var(--accent) 30%, transparent);
  border-radius: 12px;
  font-weight: 500;
  padding: 12px 24px;
}
```

### **Cards**
```css
.theme-card {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-secondary);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.theme-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
}
```

### **Navigation**
```css
/* Navbar styling */
backdrop-filter: blur(20px);
background: color-mix(in srgb, var(--bg-primary) 90%, transparent);
border-bottom: 1px solid var(--border-secondary);
```

---

## Interactive States

### **Hover Effects**
```css
/* Subtle lift for cards */
transform: translateY(-2px);
box-shadow: 0 8px 32px var(--shadow-primary);

/* Color transitions */
transition: all 0.3s ease;
```

### **Focus States**
```css
/* Keyboard navigation */
outline: 2px solid var(--accent);
outline-offset: 2px;
```

### **Active States**
```css
/* Button press feedback */
transform: translateY(0px);
box-shadow: 0 2px 8px var(--shadow-primary);
```

---

## Animation Guidelines

### **Timing Functions**
```css
/* Micro-interactions */
transition: all 0.2s ease-out;

/* Component transitions */
transition: all 0.3s ease;

/* Page transitions */
transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

### **Custom Animations**
```css
/* Fade in on scroll */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hover image effect */
@keyframes imageHover {
  from { transform: scale(1); filter: blur(4px); opacity: 0.5; }
  to { transform: scale(1.05); filter: blur(0); opacity: 1; }
}
```

---

## Responsive Design

### **Breakpoints**
```css
/* Tailwind breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large screens */
```

### **Mobile-First Rules**
1. **Content Priority**: Lo más importante primero
2. **Touch Targets**: Mínimo 44px de altura
3. **Typography**: Escala apropiada para lectura móvil
4. **Navigation**: Menú hamburguesa colapsable
5. **Images**: Optimización automática de tamaños

---

## Content Guidelines

### **Microcopy**
- **Botones**: Verbos de acción claros ("Ver Proyecto", "Contactar", "Descargar CV")
- **Enlaces**: Descriptivos, no "click aquí"
- **Placeholder Text**: Útil y específico
- **Error Messages**: Claros, útiles, no técnicos

### **Content Tone**
- **Profesional**: Serio pero accesible
- **Técnico**: Preciso pero comprensible
- **Personal**: Auténtico y humano
- **Bilingüe**: Consistencia entre español e inglés

---

## Accessibility Standards

### **Color Contrast**
- **WCAG AA**: Mínimo 4.5:1 para texto normal
- **WCAG AAA**: Objetivo 7:1 para texto importante
- **Color Blind Friendly**: No depender solo del color para información

### **Keyboard Navigation**
```css
/* Focus indicators */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### **Semantic HTML**
- **Headings**: Jerarquía lógica h1→h2→h3
- **Landmarks**: `<main>`, `<nav>`, `<section>`, `<article>`
- **Alt Text**: Descriptivo para todas las imágenes
- **ARIA Labels**: Para elementos interactivos complejos

---

## Performance Standards

### **Core Web Vitals Targets**
- **LCP**: < 1.2s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### **Optimization Rules**
- **Images**: WebP format, lazy loading, responsive srcset
- **Fonts**: Preload critical fonts, font-display: swap
- **CSS**: Critical CSS inline, non-critical deferred
- **JavaScript**: Island architecture, minimal bundle size

---

## Implementation Checklist

### **Visual Consistency**
- [ ] All components use design tokens
- [ ] Consistent spacing throughout
- [ ] Proper typography hierarchy
- [ ] Appropriate color usage

### **Interaction Design**
- [ ] Smooth hover states
- [ ] Clear focus indicators
- [ ] Appropriate feedback for actions
- [ ] Loading states for async operations

### **Responsive Behavior**
- [ ] Mobile-first approach
- [ ] Touch-friendly interactions
- [ ] Readable typography at all sizes
- [ ] Proper layout adaptation

### **Accessibility Compliance**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Sufficient color contrast
- [ ] Proper semantic markup

---

*Esta guía de estilo debe evolucionar con el proyecto. Actualizar según feedback de usuarios y mejoras en el diseño.*
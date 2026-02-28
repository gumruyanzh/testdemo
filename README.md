# TestDemo - Mobile Responsive Application

A fully mobile-responsive web application built with React 19, TypeScript, and Tailwind CSS.

## Features

- 📱 **Mobile-First Design**: Optimized for mobile devices with responsive layouts
- 🎨 **Tailwind CSS**: Modern utility-first CSS framework
- ⚛️ **React 19**: Latest version of React with improved performance
- 📘 **TypeScript**: Type-safe code for better maintainability
- 🧪 **Testing**: Vitest and React Testing Library for unit tests
- 🎯 **State Management**: Zustand for client state, TanStack Query for server state
- 🚀 **Fast Build**: Vite for lightning-fast development and builds

## Responsive Design Features

- **Breakpoints**: Mobile (default), SM (640px), MD (768px), LG (1024px), XL (1280px)
- **Mobile Menu**: Touch-friendly navigation with slide-out menu
- **Flexible Grids**: Responsive grid layouts that adapt to screen size
- **Typography**: Scalable text sizes for optimal readability
- **Touch Targets**: Large, accessible buttons and interactive elements
- **Responsive Images**: Optimized for different screen densities

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   └── MobileMenu.tsx
├── pages/           # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ProductsPage.tsx
│   ├── ContactPage.tsx
│   └── NotFoundPage.tsx
├── store/           # State management
│   └── useMobileMenuStore.ts
├── test/            # Test utilities
│   └── setup.ts
├── App.tsx          # Main app component
├── main.tsx         # App entry point
└── index.css        # Global styles
```

## Technologies

- **React 19**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **React Router**: Routing
- **Zustand**: Client state management
- **TanStack Query**: Server state management
- **Vitest**: Testing framework
- **React Testing Library**: Component testing

## Mobile Responsive Features Implemented

1. **Responsive Navigation**
   - Desktop: Horizontal navigation bar
   - Mobile: Hamburger menu with slide-out panel

2. **Flexible Layouts**
   - Grid systems that adapt from 1 column (mobile) to 4 columns (desktop)
   - Responsive spacing and padding

3. **Typography Scale**
   - Text sizes adjust based on screen size
   - Optimal line lengths for readability

4. **Touch-Friendly**
   - Large tap targets (minimum 44x44px)
   - Proper spacing between interactive elements

5. **Performance**
   - Optimized bundle size
   - Lazy loading where appropriate
   - Fast initial load

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

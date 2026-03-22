# Test Demo - Password Reset Feature

A modern React application demonstrating password reset functionality with TypeScript, TanStack Query, and Tailwind CSS.

## Features

- **Forgot Password Flow**: Users can request a password reset by entering their email address
- **Password Reset Flow**: Users can reset their password using a reset token
- **Type-Safe**: Full TypeScript support with strict type checking
- **Modern UI**: Responsive design with Tailwind CSS and dark mode support
- **State Management**: Client state managed with Zustand, server state with TanStack Query
- **Accessible**: Proper ARIA labels and semantic HTML
- **Tested**: Comprehensive test coverage with Vitest and React Testing Library

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Powerful async state management
- **Zustand** - Lightweight state management
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

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

# Run linter
npm run lint
```

## Usage

### Forgot Password

1. Enter your email address in the "Forgot Password" form
2. Click "Send Reset Link"
3. A reset token will be generated (in production, this would be sent via email)
4. The app automatically switches to the "Reset Password" view

### Reset Password

1. Enter your new password
2. Confirm your new password
3. Click "Reset Password"
4. Success! Your password has been reset

## Project Structure

```
src/
├── components/
│   ├── ForgotPasswordForm.tsx    # Email submission form
│   ├── ResetPasswordForm.tsx     # New password form
│   └── ui/                       # Reusable UI components
│       ├── Alert.tsx
│       ├── Button.tsx
│       └── Input.tsx
├── services/
│   └── passwordResetService.ts   # API service layer
├── store/
│   └── passwordResetStore.ts     # Zustand store
├── test/
│   └── setup.ts                  # Test configuration
├── App.tsx                       # Main app component
├── main.tsx                      # App entry point
└── index.css                     # Global styles
```

## Testing

The project includes comprehensive tests for:
- Form components (ForgotPasswordForm, ResetPasswordForm)
- API service layer
- User interactions and form validation
- Loading and error states

Run tests with:
```bash
npm test
```

## API Service

The `passwordResetService` provides two methods:

- `sendResetEmail(data)`: Sends a password reset email (mock implementation)
- `resetPassword(data)`: Resets the user's password (mock implementation)

In production, these would make actual HTTP requests to your backend API.

## Contributing

1. Create a feature branch
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT

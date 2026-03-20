# testdemo

A modern authentication system built with React 19, TypeScript, and TanStack Query.

## Features

- **User Registration**: Sign up with email verification
- **Secure Login**: Email and password authentication with session management
- **Password Reset**: Forgot password functionality with secure token-based reset
- **User Profile**: View and update personal information
- **Session Management**: Automatic session expiry and validation
- **Input Validation**: Comprehensive form validation with Zod
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **Type Safety**: Fully typed with TypeScript
- **Testing**: Unit tests with Vitest and React Testing Library

## Tech Stack

- **React 19**: Latest React with modern hooks and concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **TanStack Query**: Server state management
- **Zustand**: Client state management with persistence
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Zod**: Schema validation
- **Vitest**: Unit testing framework
- **React Testing Library**: Component testing

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── ForgotPassword.tsx
│   │   └── ResetPassword.tsx
│   ├── dashboard/      # Dashboard components
│   │   └── Dashboard.tsx
│   ├── profile/        # Profile components
│   │   └── Profile.tsx
│   └── ProtectedRoute.tsx
├── hooks/              # Custom React hooks
│   └── useForm.ts
├── lib/               # Utilities and API
│   ├── api.ts
│   └── validation.ts
├── store/             # State management
│   └── authStore.ts
├── test/              # Test configuration
│   └── setup.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Authentication Flow

1. **Sign Up**: Users create an account with email and password
2. **Email Verification**: Verification token is generated (sent via email in production)
3. **Login**: Users authenticate with credentials
4. **Session**: JWT token stored in Zustand with persistence
5. **Protected Routes**: Automatic redirect if not authenticated
6. **Password Reset**: Request reset link, set new password with token
7. **Logout**: Clear session and redirect to login

## Security Features

- Password strength validation (min 8 chars, uppercase, lowercase, number)
- Email verification flow
- Secure password reset with tokens
- Session expiry management
- Protected routes
- Input sanitization and validation
- HTTPS-ready (configure in production)

## Demo Mode

The current implementation uses a mock API for demonstration purposes. In production:

1. Replace `authAPI` functions in `src/lib/api.ts` with actual API calls
2. Implement server-side authentication
3. Add proper password hashing (bcrypt/argon2)
4. Set up email service for verification and password reset
5. Configure environment variables for API endpoints

## Testing

Tests are written using Vitest and React Testing Library:

- Component rendering tests
- Form validation tests
- User interaction tests
- Accessibility tests

Run tests with:

```bash
npm test
```

## Customization

### Styling

Tailwind CSS is configured in `tailwind.config.js`. Custom styles are in `src/index.css`.

### Validation

Zod schemas are defined in `src/lib/validation.ts`. Modify these to change validation rules.

### State Management

- **Auth State**: `src/store/authStore.ts` (Zustand)
- **Server State**: TanStack Query hooks in components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

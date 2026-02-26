# TestDemo - User Authentication System

A complete user registration and authentication system built with Node.js, Express, and SQLite.

## Features

- **User Registration**: Create new accounts with email verification
- **Secure Login**: JWT-based authentication with password hashing
- **Email Verification**: Verify email addresses via secure tokens
- **Password Reset**: Recover forgotten passwords through email
- **User Profiles**: View and update user information
- **Session Management**: Persistent sessions with secure cookies
- **Responsive Design**: Mobile-friendly UI that works on all devices
- **Security**: bcrypt password hashing, JWT tokens, and secure cookies

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Email**: Nodemailer
- **Templating**: EJS
- **Validation**: express-validator
- **Testing**: Jest and Supertest

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gumruyanzh/testdemo.git
cd testdemo
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your configuration:
- `JWT_SECRET`: A secure random string for JWT signing
- `SESSION_SECRET`: A secure random string for session encryption
- `EMAIL_*`: SMTP configuration for sending emails (optional for development)

4. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Registration

1. Navigate to `/register`
2. Fill in your name, email, and password
3. Submit the form
4. Check your email for a verification link
5. Click the verification link to activate your account

### Login

1. Navigate to `/login`
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to your profile page

### Password Reset

1. Navigate to `/forgot-password`
2. Enter your email address
3. Check your email for a reset link
4. Click the link and enter a new password
5. Login with your new password

### Profile Management

1. Login to your account
2. Navigate to `/profile`
3. Update your name
4. Resend verification email if needed

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Home page | No |
| GET | `/register` | Registration form | No |
| POST | `/register` | Create new user | No |
| GET | `/login` | Login form | No |
| POST | `/login` | Authenticate user | No |
| GET | `/logout` | Logout user | Yes |
| GET | `/profile` | User profile | Yes |
| POST | `/profile` | Update profile | Yes |
| GET | `/verify-email` | Verify email token | No |
| POST | `/resend-verification` | Resend verification email | Yes |
| GET | `/forgot-password` | Password reset form | No |
| POST | `/forgot-password` | Send reset email | No |
| GET | `/reset-password` | Password reset form | No |
| POST | `/reset-password` | Reset password | No |

## Testing

Run the test suite:
```bash
npm test
```

This will run all unit and integration tests with coverage reporting.

## Project Structure

```
testdemo/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   └── User.js              # User model
├── routes/
│   └── auth.js              # Authentication routes
├── utils/
│   ├── email.js             # Email utilities
│   └── token.js             # Token generation
├── views/
│   ├── index.ejs            # Home page
│   ├── register.ejs         # Registration form
│   ├── login.ejs            # Login form
│   ├── profile.ejs          # User profile
│   ├── forgot-password.ejs  # Forgot password form
│   ├── reset-password.ejs   # Reset password form
│   ├── message.ejs          # Success messages
│   └── error.ejs            # Error pages
├── tests/
│   └── auth.test.js         # Authentication tests
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── server.js                # Application entry point
└── README.md                # This file
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Tokens**: Secure, stateless authentication
- **HTTP-Only Cookies**: Tokens stored in HTTP-only cookies to prevent XSS
- **Email Verification**: Ensures email addresses are valid and owned by users
- **Password Reset Tokens**: Time-limited, single-use tokens for password recovery
- **Input Validation**: All user inputs are validated and sanitized
- **SQL Injection Protection**: Sequelize ORM prevents SQL injection attacks

## Email Configuration

For development, the application logs email content to the console. For production:

1. Set up an SMTP server or use a service like:
   - Gmail (requires app password)
   - SendGrid
   - AWS SES
   - Mailgun

2. Update the `.env` file with your SMTP credentials:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@yourdomain.com
```

## Development

To contribute or modify:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run tests: `npm test`
6. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

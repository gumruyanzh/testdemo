# testdemo

User authentication system with database schema and models.

## Database Schema

### User Model

The User model includes the following fields:

- **id**: Integer, primary key, auto-increment
- **name**: String, required, 2-100 characters
- **email**: String, required, unique, validated as email format
- **password**: String, required, hashed using bcryptjs (min 6 characters)
- **isVerified**: Boolean, default false
- **verificationToken**: String, nullable, for email verification
- **resetPasswordToken**: String, nullable, for password reset
- **resetPasswordExpires**: Date, nullable, expiration time for reset token
- **createdAt**: Timestamp, auto-generated
- **updatedAt**: Timestamp, auto-generated

### Indexes

The following indexes are created for optimal query performance:

- **email**: Unique index for fast user lookup during authentication
- **verificationToken**: Index for quick verification token lookup
- **resetPasswordToken**: Index for password reset token lookup
- **createdAt**: Index for sorting/filtering users by creation date

### Security Features

- Password hashing using bcryptjs with salt rounds of 10
- Automatic password hashing on user creation and update
- Instance method for secure password comparison
- Email validation at database level

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

## Database

The application uses SQLite with Sequelize ORM. The database file will be automatically created at `database.sqlite` when the application starts.
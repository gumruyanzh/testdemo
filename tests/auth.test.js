const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const sequelize = require('../config/database');

describe('Authentication System', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('User Registration', () => {
    test('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });

      expect(response.status).toBe(200);

      const user = await User.findOne({ where: { email: 'test@example.com' } });
      expect(user).toBeTruthy();
      expect(user.name).toBe('Test User');
      expect(user.isVerified).toBe(false);
    });

    test('should not register user with existing email', async () => {
      await User.create({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .post('/register')
        .send({
          name: 'New User',
          email: 'existing@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Email already registered');
    });

    test('should validate password length', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'Test User',
          email: 'test2@example.com',
          password: '123',
          confirmPassword: '123'
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Password must be at least 6 characters');
    });

    test('should validate password confirmation', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'Test User',
          email: 'test3@example.com',
          password: 'password123',
          confirmPassword: 'password456'
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Passwords do not match');
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      await User.destroy({ where: {} });
      await User.create({
        name: 'Login Test User',
        email: 'login@example.com',
        password: 'password123'
      });
    });

    test('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe('/profile');
    });

    test('should not login with invalid email', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'wrong@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Invalid email or password');
    });

    test('should not login with invalid password', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Invalid email or password');
    });
  });

  describe('Password Reset', () => {
    beforeEach(async () => {
      await User.destroy({ where: {} });
      await User.create({
        name: 'Reset Test User',
        email: 'reset@example.com',
        password: 'password123'
      });
    });

    test('should initiate password reset', async () => {
      const response = await request(app)
        .post('/forgot-password')
        .send({
          email: 'reset@example.com'
        });

      expect(response.status).toBe(200);

      const user = await User.findOne({ where: { email: 'reset@example.com' } });
      expect(user.resetPasswordToken).toBeTruthy();
      expect(user.resetPasswordExpires).toBeTruthy();
    });

    test('should handle non-existent email gracefully', async () => {
      const response = await request(app)
        .post('/forgot-password')
        .send({
          email: 'nonexistent@example.com'
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Reset Email Sent');
    });
  });
});

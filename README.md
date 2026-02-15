# Test432 API - Backend Demo

A comprehensive FastAPI backend application demonstrating best practices for API development, authentication, and CRUD operations.

## Features

- **RESTful API Design**: Clean and intuitive API endpoints
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: Bcrypt password hashing
- **Database Integration**: SQLAlchemy ORM with SQLite
- **Input Validation**: Pydantic schemas for request/response validation
- **Comprehensive Tests**: Full test coverage with pytest
- **API Documentation**: Auto-generated OpenAPI/Swagger documentation

## Tech Stack

- **Framework**: FastAPI 0.109.0
- **Database**: SQLAlchemy 2.0.25 with SQLite
- **Authentication**: JWT (python-jose) + Bcrypt (passlib)
- **Testing**: pytest + httpx
- **ASGI Server**: Uvicorn

## Project Structure

```
testdemo/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration management
│   ├── database.py          # Database connection and session
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # Authentication logic
│   └── routers/
│       ├── __init__.py
│       ├── auth.py          # Authentication endpoints
│       └── items.py         # Item CRUD endpoints
├── tests/
│   ├── __init__.py
│   └── test_api.py          # API tests
├── requirements.txt         # Python dependencies
├── pytest.ini              # Pytest configuration
└── README.md               # This file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gumruyanzh/testdemo.git
   cd testdemo
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

## Running the Application

Start the development server:

```bash
uvicorn app.main:app --reload
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication

- **POST** `/api/v1/auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "username": "username",
    "password": "password123"
  }
  ```

- **POST** `/api/v1/auth/token` - Login and get JWT token
  ```
  Form data:
  - username: your_username
  - password: your_password
  ```

- **GET** `/api/v1/auth/me` - Get current user info (requires authentication)

### Items (Protected Endpoints)

All item endpoints require authentication via JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

- **POST** `/api/v1/items/` - Create a new item
  ```json
  {
    "title": "Item Title",
    "description": "Item Description"
  }
  ```

- **GET** `/api/v1/items/` - Get all user's items
  - Query params: `skip` (default: 0), `limit` (default: 100)

- **GET** `/api/v1/items/{item_id}` - Get a specific item

- **PUT** `/api/v1/items/{item_id}` - Update an item
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description"
  }
  ```

- **DELETE** `/api/v1/items/{item_id}` - Delete an item

## Testing

Run all tests:

```bash
pytest
```

Run with coverage:

```bash
pytest --cov=app tests/
```

Run specific test file:

```bash
pytest tests/test_api.py -v
```

## Example Usage

1. **Register a user**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/auth/register" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","username":"testuser","password":"testpass123"}'
   ```

2. **Login and get token**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/auth/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=testuser&password=testpass123"
   ```

3. **Create an item** (use token from login)
   ```bash
   curl -X POST "http://localhost:8000/api/v1/items/" \
     -H "Authorization: Bearer <your_token>" \
     -H "Content-Type: application/json" \
     -d '{"title":"My Item","description":"Item description"}'
   ```

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: All inputs validated via Pydantic schemas
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection
- **CORS**: Configurable CORS middleware
- **Authentication Required**: Protected endpoints require valid JWT

## Configuration

Environment variables (see `.env.example`):

- `DATABASE_URL`: Database connection string (default: sqlite:///./test432.db)
- `SECRET_KEY`: Secret key for JWT token signing (change in production!)
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time (default: 30)

## Best Practices Implemented

- ✅ RESTful API design
- ✅ Proper error handling and HTTP status codes
- ✅ Input validation with Pydantic
- ✅ Secure password hashing
- ✅ JWT token authentication
- ✅ Database transactions
- ✅ Dependency injection
- ✅ Comprehensive testing
- ✅ API documentation (OpenAPI/Swagger)
- ✅ Environment-based configuration
- ✅ Clean code architecture

## License

MIT

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db

# Test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_database():
    """Create and drop tables for each test."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_root():
    """Test root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "Welcome to Test432 API"


def test_health_check():
    """Test health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_register_user():
    """Test user registration."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpass123"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["username"] == "testuser"
    assert "id" in data


def test_register_duplicate_user():
    """Test registering a duplicate user."""
    user_data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpass123"
    }

    # Register first user
    response1 = client.post("/api/v1/auth/register", json=user_data)
    assert response1.status_code == 201

    # Try to register duplicate
    response2 = client.post("/api/v1/auth/register", json=user_data)
    assert response2.status_code == 400


def test_login():
    """Test user login."""
    # Register user
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpass123"
        }
    )

    # Login
    response = client.post(
        "/api/v1/auth/token",
        data={"username": "testuser", "password": "testpass123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_credentials():
    """Test login with invalid credentials."""
    response = client.post(
        "/api/v1/auth/token",
        data={"username": "nonexistent", "password": "wrong"}
    )
    assert response.status_code == 401


def test_get_current_user():
    """Test getting current user info."""
    # Register and login
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpass123"
        }
    )

    login_response = client.post(
        "/api/v1/auth/token",
        data={"username": "testuser", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Get current user
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"


def test_create_item():
    """Test creating an item."""
    # Register and login
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpass123"
        }
    )

    login_response = client.post(
        "/api/v1/auth/token",
        data={"username": "testuser", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]

    # Create item
    response = client.post(
        "/api/v1/items/",
        json={"title": "Test Item", "description": "Test Description"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Item"
    assert data["description"] == "Test Description"


def test_get_items():
    """Test getting items."""
    # Register and login
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpass123"
        }
    )

    login_response = client.post(
        "/api/v1/auth/token",
        data={"username": "testuser", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create items
    client.post(
        "/api/v1/items/",
        json={"title": "Item 1", "description": "Description 1"},
        headers=headers
    )
    client.post(
        "/api/v1/items/",
        json={"title": "Item 2", "description": "Description 2"},
        headers=headers
    )

    # Get items
    response = client.get("/api/v1/items/", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_update_item():
    """Test updating an item."""
    # Register and login
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpass123"
        }
    )

    login_response = client.post(
        "/api/v1/auth/token",
        data={"username": "testuser", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create item
    create_response = client.post(
        "/api/v1/items/",
        json={"title": "Original Title", "description": "Original Description"},
        headers=headers
    )
    item_id = create_response.json()["id"]

    # Update item
    response = client.put(
        f"/api/v1/items/{item_id}",
        json={"title": "Updated Title"},
        headers=headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Title"


def test_delete_item():
    """Test deleting an item."""
    # Register and login
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpass123"
        }
    )

    login_response = client.post(
        "/api/v1/auth/token",
        data={"username": "testuser", "password": "testpass123"}
    )
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create item
    create_response = client.post(
        "/api/v1/items/",
        json={"title": "To Delete", "description": "Will be deleted"},
        headers=headers
    )
    item_id = create_response.json()["id"]

    # Delete item
    response = client.delete(f"/api/v1/items/{item_id}", headers=headers)
    assert response.status_code == 204

    # Verify deletion
    get_response = client.get(f"/api/v1/items/{item_id}", headers=headers)
    assert get_response.status_code == 404


def test_unauthorized_access():
    """Test accessing protected endpoints without authentication."""
    response = client.get("/api/v1/items/")
    assert response.status_code == 401

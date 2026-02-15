#!/bin/bash

# Simple script to run the FastAPI application

echo "Starting Test432 API server..."
echo "API will be available at: http://localhost:8000"
echo "Interactive docs at: http://localhost:8000/docs"
echo ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

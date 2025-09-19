# Multi-stage build for React frontend and Flask backend
FROM node:18-alpine AS frontend-build

# Build React frontend
WORKDIR /app/frontend
COPY adresponse-frontend/package*.json ./
RUN npm ci --only=production
COPY adresponse-frontend/ ./
RUN npm run build

# Python backend stage
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy Python requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask backend
COPY src/ ./src/

# Copy built frontend from previous stage
COPY --from=frontend-build /app/frontend/dist ./src/static

# Create necessary directories
RUN mkdir -p src/database

# Expose port
EXPOSE 5000

# Set environment variables
ENV FLASK_ENV=production
ENV PYTHONPATH=/app

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/ || exit 1

# Run the application
CMD ["python", "src/main.py"]

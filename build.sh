#!/bin/bash
set -e

echo "Building AdResponse Application..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd adresponse-frontend
npm install --legacy-peer-deps

# Build frontend
echo "Building frontend..."
npm run build

# Copy built files to Flask static directory
echo "Copying built files..."
cd ..
cp -r adresponse-frontend/dist/* src/static/

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Build complete!"

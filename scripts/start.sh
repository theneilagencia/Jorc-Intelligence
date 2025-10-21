#!/bin/bash
set -e

echo "🚀 Starting ComplianceCore Mining™..."

# Check required environment variables
if [ -z "$DB_URL" ]; then
  echo "❌ Error: DB_URL not set"
  exit 1
fi

if [ -z "$JWT_SECRET" ]; then
  echo "❌ Error: JWT_SECRET not set"
  exit 1
fi

if [ -z "$AWS_ACCESS_KEY_ID" ]; then
  echo "⚠️  Warning: AWS_ACCESS_KEY_ID not set - S3 uploads will fail"
fi

echo "✅ Environment variables validated"

# Start the server
echo "🌐 Starting Express server..."
NODE_ENV=production node server/_core/index.js


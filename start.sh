#!/bin/bash
set -e

echo "🚀 ComplianceCore Mining™ - Starting Production Server"
echo "======================================================="

# Validate required environment variables
if [ -z "$JWT_SECRET" ]; then
  echo "❌ Error: JWT_SECRET not set"
  exit 1
fi

if [ -z "$DB_URL" ]; then
  echo "⚠️  Warning: DB_URL not set - database features will be limited"
fi

echo "✅ Environment validated"
echo "🌐 Starting server on port ${PORT:-10000}..."

# Start the production server
NODE_ENV=production node dist/index.js


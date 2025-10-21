#!/bin/bash
set -e

echo "🔧 Installing dependencies..."
pnpm install --frozen-lockfile

echo "📦 Building client..."
cd client
pnpm build
cd ..

echo "🗄️  Running database migrations..."
pnpm db:push || echo "⚠️  Database migration failed, continuing..."

echo "✅ Build completed successfully!"


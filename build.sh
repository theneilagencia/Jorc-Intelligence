#!/bin/bash
set -e

echo "🔧 ComplianceCore Mining™ - Build Script"
echo "=========================================="

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build client (Vite)
echo "🎨 Building client..."
cd client
pnpm build
cd ..

# Build server (esbuild)
echo "⚙️  Building server..."
pnpm exec esbuild server/_core/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --sourcemap

# Run database migrations
echo "🗄️  Running database migrations..."
if [ -n "$DB_URL" ]; then
  pnpm db:push || echo "⚠️  Database migration skipped"
else
  echo "⚠️  DB_URL not set, skipping migrations"
fi

echo "✅ Build completed successfully!"


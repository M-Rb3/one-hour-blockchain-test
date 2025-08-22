#!/bin/bash

echo "🚀 Setting up Blockchain Coding Test with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Build and start the containers
echo "🔨 Building Docker containers..."
docker-compose build

echo "🚀 Starting the development environment..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 10

echo "✅ Setup complete!"
echo ""
echo "📋 Available services:"
echo "   🌐 Frontend: http://localhost:5173"
echo "   ⛓️  Hardhat Node: http://localhost:8545"
echo ""
echo "🔧 Useful commands:"
echo "   docker-compose logs -f          # View logs"
echo "   docker-compose exec blockchain-test npm test    # Run tests"
echo "   docker-compose exec blockchain-test npm run compile  # Compile contracts"
echo "   docker-compose down             # Stop services"
echo ""
echo "🎯 Next steps:"
echo "   1. Open http://localhost:5173 in your browser"
echo "   2. Start completing the TODOs in the code"
echo "   3. Use the terminal to run tests and deploy contracts"

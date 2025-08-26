# Use Node.js 24 LTS as base image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY package*.json ./
COPY hardhat.config.cjs ./

# Install dependencies
RUN npm install

# Copy frontend package files
COPY frontned/package*.json ./frontned/

# Install frontend dependencies
RUN cd frontned && npm install

# Copy source code
COPY . .

# Expose ports
EXPOSE 8080 8545

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Default command
CMD ["sh", "-c", "cd frontned && npm run dev"]

# Multi-stage build for production
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S quantum -u 1001

# Copy built application
COPY --from=builder --chown=quantum:nodejs /app/build ./build
COPY --from=builder --chown=quantum:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=quantum:nodejs /app/package.json ./package.json
COPY --from=builder --chown=quantum:nodejs /app/scripts ./scripts

# Create data directory for SQLite
RUN mkdir -p /app/data && chown quantum:nodejs /app/data

USER quantum

EXPOSE 3000 3001

ENV NODE_ENV=production
ENV PORT=3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start both frontend and backend
CMD ["sh", "-c", "npm run dev:backend & npm run preview"]

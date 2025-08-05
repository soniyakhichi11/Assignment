# ----------- Build Stage -----------
# Use Node.js base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm ci

# Copy source files
COPY . .

# Build the NestJS app
RUN npm run build

# ----------- Production Stage -----------
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder package*.json ./
Run npm ci --only=production
COPY --from=builder /app/dist ./dist

# Expose the port (corrected casing and port number)
EXPOSE 3000

# Start the app
CMD ["npm","run","start:prod"]

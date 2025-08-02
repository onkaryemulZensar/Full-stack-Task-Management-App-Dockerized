# Stage 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with serve
FROM node:20-alpine

# Install serve globally
RUN npm install -g serve

WORKDIR /app

# Copy build files from the previous stage
COPY --from=build /app/build ./build

# Expose port 3000 (serve default)
EXPOSE 3000

# Serve the production build
CMD ["serve", "-s", "build", "-l", "3000"]

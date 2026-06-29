# ==========================================
# STAGE 1: Build the React App
# ==========================================
# We use node:20-alpine (alpine is a super tiny version of Linux to save space)
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first.
# We do this BEFORE copying the rest of the code because Docker caches layers.
# If your dependencies don't change, Docker skips the `npm ci` step and saves a lot of time!
COPY package*.json ./

# Install dependencies (npm ci is faster and stricter than npm install for CI/CD)
RUN npm ci

# Copy the rest of your frontend code
COPY . .

# Build the React app (this creates the /dist folder containing static HTML/JS/CSS)
RUN npm run build

# ==========================================
# STAGE 2: Serve the App with Nginx
# ==========================================
# We throw away the Node container and start fresh with Nginx.
# Why? Node is heavy and consumes memory. Nginx is incredibly fast for serving static files.
FROM nginx:alpine

# Copy the built files from Stage 1 (named 'build') into Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Replace the default Nginx config with our custom one that handles React Router
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (this is just documentation for the container)
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]

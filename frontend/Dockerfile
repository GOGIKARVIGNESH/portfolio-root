# Stage 1: Build the React application
# We use a Node.js base image to run npm commands
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
# This is a key optimization to leverage Docker's caching
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Run the build command to create the static files
# Vite's default output folder is 'dist'
RUN npm run build

# Stage 2: Serve the static files with NGINX
# We use a lightweight NGINX image for the final production container
FROM nginx:alpine

# Copy the built static files from the 'build' stage to NGINX's web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
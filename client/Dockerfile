# Use Node.js for building the React app
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client files
COPY . ./

# Build the React application
RUN npm run build

# Use Nginx to serve the built React application
FROM nginx:alpine

# Copy the build output to Nginx's default HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

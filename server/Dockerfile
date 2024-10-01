# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the server files
COPY . ./

# Expose the port your server runs on (default: 3000)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]

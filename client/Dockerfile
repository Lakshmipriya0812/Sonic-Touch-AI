# Use node base image for building
FROM node:20

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Build the app for production
RUN npm run build

# Install a static file server to serve the built app
RUN npm install -g serve

EXPOSE 5000  

# Serve the built app
CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]


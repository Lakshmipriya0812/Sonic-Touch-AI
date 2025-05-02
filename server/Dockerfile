FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have one) and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project into the container
COPY . .

# Make sure the start.sh script is executable
RUN chmod +x start.sh

# Expose the application port (useful for your API)
EXPOSE 5000

# The default command will run the start.sh script
CMD ["./start.sh"]


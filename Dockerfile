# Use a specific version of the node image
FROM node:20.10

# Set the working directory in the container
WORKDIR /app

# Copy package.json, yarn.lock, and other relevant configuration files
COPY package.json yarn.lock next.config.js tsconfig.json postcss.config.js tailwind.config.ts ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]

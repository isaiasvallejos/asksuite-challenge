FROM node:8.15.1-alpine
LABEL maintainer="me@isaiasvallejos.dev"

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Copy dependencies files 
COPY ./package* ./

# Install dependencies
RUN npm install --silent

# Copy all files
COPY . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Expose ports and start application
EXPOSE 8080
CMD [ "npm", "start" ]
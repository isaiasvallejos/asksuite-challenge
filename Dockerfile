FROM node:8.15.1-alpine
LABEL maintainer="me@isaiasvallejos.dev"

# Copied from puppeteer/issues/1793
# Create environment to work with chromium (puppeteer)
ENV CHROME_BIN="/usr/bin/chromium-browser"\
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

# Install puppeteer dependencies
RUN set -x \
  && apk update \
  && apk upgrade \
  # Replacing default repositories with edge ones
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" > /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
  # Add the packages
  && apk add --no-cache dumb-init curl make gcc g++ python linux-headers binutils-gold gnupg libstdc++ nss chromium \
  && npm install puppeteer \
  # Do some cleanup
  && apk del --no-cache make gcc g++ python binutils-gold gnupg libstdc++ \
  && rm -rf /usr/include \
  && rm -rf /var/cache/apk/* /root/.node-gyp /usr/share/man /tmp/*

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
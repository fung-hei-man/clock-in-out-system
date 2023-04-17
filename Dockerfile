FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Set timezone
ENV TZ="Asia/Taipei"

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]

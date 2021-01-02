# Pull official image for node.
FROM node:14.15.0-alpine

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# Add src in /app -> note that ignored file are not present in context
ADD . ./

# Start app with doc enforced "exec-form"
CMD ["npm", "start"]


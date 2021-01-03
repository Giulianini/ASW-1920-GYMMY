# ----------- Development ---------------
FROM node:14.15.0-alpine
# Set working directory
WORKDIR /app
# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Copy dependencies
COPY package*.json ./
# Add src in /app -> note that ignored file are not present in context
COPY . .
# Install app dependencies
RUN npm install --quiet
RUN npm install react-scripts@3.4.1 -g --quiet
# Start app with doc enforced "exec-form"
ENTRYPOINT ["npm", "start"]


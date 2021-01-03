# ----------- Development ---------------
FROM node:14.15.0-alpine
# Set working directory
WORKDIR /usr/src/api
# Copy dependencies
COPY package*.json ./
# Add src in /app -> note that ignored file are not present in context
COPY . .
# Install app dependencies
RUN npm install --quiet
# Document that i hope you expose 8080
EXPOSE 8080
# Start app with doc enforced "exec-form"
ENTRYPOINT ["node", "Server.js"]

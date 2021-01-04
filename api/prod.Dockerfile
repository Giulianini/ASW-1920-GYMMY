# ----------- Production ---------------
# Pull official image for node.
FROM node:14.15.0-alpine
LABEL stage=build-stage
# Set working directory
WORKDIR /app
# Copy dependencies
COPY package*.json ./
# Add src in /app -> note that ignored file are not present in context
COPY ./src ./src
# Install app dependencies
RUN npm ci --only=production --quiet
# Document that i hope you expose 8080
EXPOSE 8080
ENTRYPOINT ["node", "src/Server.js"]


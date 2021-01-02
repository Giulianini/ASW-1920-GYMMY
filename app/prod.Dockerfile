####### Build Environment
# Pull official image for node.
FROM node:14.15.0-alpine AS builder
LABEL stage=builder

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent

# Add src in /app -> note that ignored file are not present in context
ADD . ./

# Start app with doc enforced "exec-form"
RUN npm run build

####### Production Environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Delete intermediate images:  docker image prune --filter label=stage=builder
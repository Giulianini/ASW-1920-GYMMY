# ----------- Production ---------------

# ------- Build Stage
FROM node:14.15.0-alpine AS build-stage
LABEL stage=build-stage
# Set working directory
WORKDIR /app
# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Copy dependencies
COPY package*.json ./
# Add src in /app -> note that ignored file are not present in context
COPY . .
# Install app dependencies
RUN npm ci --only=production --quiet
# Build app with doc enforced "exec-form"
RUN npm run build

# ------- Release Stage
FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

# Delete intermediate images:  docker image prune --filter label=stage=builder
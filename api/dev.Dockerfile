# ----------- Development ---------------
FROM node:14.15.0-alpine
# Set working directory
WORKDIR /app
# Start app with doc enforced "exec-form"
ENTRYPOINT ["node", "Server.js"]

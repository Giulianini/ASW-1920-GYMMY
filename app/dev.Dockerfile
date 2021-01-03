# ----------- Development ---------------
FROM node:14.15.0-alpine
# Set working directory. In compose it is binded to actual project folder
WORKDIR /app
# Start app with doc enforced "exec-form"
ENTRYPOINT ["npm", "start"]


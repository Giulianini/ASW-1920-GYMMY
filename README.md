# Gymmy web services
Gymmy app, api and database in one simple solution.

## Local development

### Command line
- **Environment variables** 
    
    This setup will use variables located in **.local.env**. 
    Create this file editing **example.local.env**
- **App and Api**
    ```
    cd app && npm install
    npm start
    cd api && npm install
    node src/Server.js
    ```
- **Mongo**
  
    You need to create an admin user in **MongoDBCompass**. See mongo README.md.

### Docker
- **Environment variables**

  This setup will use variables located in **.dev.docker-compose.env**.
  Create this file editing **example.docker-compose.env**
- **Start services**
    ```
    cd app && npm install
    cd ..
    cd api && npm install
    cd ..
    docker-compose -f dev.docker-compose.yaml up --build -d [services...]
    ```
- **Stop and cleanup**
    ```
    docker-compose -f dev.docker-compose.yaml down -v [services...]
    ```

## Run Docker-Compose production setup: App, Api and MongoDB Cluster (3 nodes) 
- ### Environment variables
  - #### App
    Modify `REACT_APP_API_URL=http://<IP>:8080` in `app/.env.production` with Server URL
  - #### Api
    Modify jwt and db connection in `api/docker_envs/.env.production`
    ```
    # ------ Api ---------
    ....
    DB_ADMIN=admin
    DB_ADMIN_PWD=password
    DB_CONNECTION=mongodb://<containerName>:27017/
        example: DB_CONNECTION=mongodb://mongo1:27017/
    JWT_SECRET=secret
    ```
  - #### Mongo
    Modify jwt and db connection in `mongo/docker_envs/.env.production`
     ```
    # ------ Api ---------
    ....
    MONGO_INITDB_ROOT_USERNAME=admin
    MONGO_INITDB_ROOT_PASSWORD=password
    MONGO_INITDB_DATABASE=gymmy
    ```
- ### Start services
    ```
    docker-compose -f prod.docker-compose.yaml up --build -d [services...]
    ```
- ### Stop and cleanup 
    ```
    docker-compose -f prod.docker-compose.yaml up --build -d [services...]
    ```
- ### Info
    ```
    docker-compose -f prod.docker-compose.yaml ps
    ```
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

## Run production setup
- **Environment variables**

  This setup will use variables located in **.prod.docker-compose.env**.
  Create this file editing **example.docker-compose.env**
- **Start services**
    ```
    docker-compose -f prod.docker-compose.yaml up --build -d [services...]
    ```
- **Stop and cleanup** 
    ```
    docker-compose -f prod.docker-compose.yaml up --build -d [services...]
    ```
- **Info**
    ```
    docker-compose -f prod.docker-compose.yaml ps
    ```
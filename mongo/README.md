# Mongo DB
## Setup Local DB
### Authentication: Create admin
You need to create an admin user in **MongoDBCompass** shell or in bash command **mongo** according to **.env** configuration.
```
use admin
db.createUser(
{
    user: "admin",
    pwd: "password",
    roles: [ "root" ]
})
```
### Connect to Local DB
```
mongodb://user:password@localhost:27017/
```

## Setup Mongo ReplicaSet Cluster on Docker
### 1 - User Authentication
#### Create admin and password for user access
- Need to create **[.dev/.prod].docker-compose.env** file from **example.env**.   
- Setup complex credentials.
- Credentials will be provided to mongo during start-up of container in the form of env variables.

### 2 - Authentication between nodes of the cluster: Keyfile
#### Generation
Create a keyfile using openssl. This protects all communications intra nodes. 
``` sh
openssl rand -base64 756 > mongo/etc/mongod_keyfile
```
#### Permission
Protect the file against unwanted read and write
``` sh
chmod 400 mongo/etc/mongod_keyfile
```

### 3 - Mount the replica nodes
#### Mounting
Mount all the nodes. They will start in order and become replica nodes 
``` sh
docker-compose -f prod.docker-compose.yaml up --build -d mongo1 mongo2 mongo3
```
#### Verifying status (healthy)
``` sh
docker-compose -f prod.docker-compose.yaml ps

    mongo1   docker-entrypoint.sh --rep ...   Up (healthy)   0.0.0.0:27018->27017/tcp
    mongo2   docker-entrypoint.sh --rep ...   Up (healthy)   0.0.0.0:27019->27017/tcp
    mongo3   docker-entrypoint.sh --rep ...   Up (healthy)   0.0.0.0:27020->27017/tcp
```
All nodes are **healthy** and **up**
#### Verifying connection from localhost
For example verification of mongo2 listening at 27019
``` sh
mongo -u <username> -p <password> --port 27019

    mongodb://127.0.0.1:27019/?compressors=disabled&gssapiServiceName=mongodb
    ...
    rs0:SECONDARY> 
```
It's by chance a **SECONDARY** node elected by quorum.

#### Verifying connection inside docker container
Enter inside a container
``` sh
docker exec -it mongo2 bash
    
    root@mongo2:/#
```

Verification of mongo2 listening at 27017 inside docker container
``` sh
mongo -u <username> -p <password> --port 27017

    mongodb://127.0.0.1:27019/?compressors=disabled&gssapiServiceName=mongodb
    ...
    rs0:SECONDARY> 
```

## Replication
When a node is stopped, mongodb will start a new election for the new Primary node.
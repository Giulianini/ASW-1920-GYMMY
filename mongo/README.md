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

## Setup Docker DB
### Authentication: Create admin
No need to create a user. **[.dev/.prod].docker-compose.env** file will provide this to mongo container.

### Connect to Docker DB from Localhost
See **port mapping** in **[.dev/.prod].docker-compose.yaml. Ex 27018:27017.
Choose outside port -> 27018
```
mongodb://user:password@localhost:27018/
```

### Connect to Docker DB from other Container inside Docker
See **port mapping** in **[.dev/.prod].docker-compose.yaml. Ex 27018:27017.
Choose inside port -> 27017 and  **container ip/name**.
```
mongodb://user:password@mongo:27017/
```
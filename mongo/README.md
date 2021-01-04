# Mongo DB
## Local
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

## Docker
No need to create an user. **.env** file will provide this to mongo container.
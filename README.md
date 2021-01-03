## Run Development
```
cd app && npm install
cd ..
cd api && npm install
cd ..
docker-compose -f dev.docker-compose.yaml up --build -d
```

### Stop and cleanup
```
docker-compose -f dev.docker-compose.yaml down -v
```

## Run production setup
```
docker-compose -f prod.docker-compose.yaml up --build -d
```

### Info
```
docker-compose -f prod.docker-compose.yaml ps
```

### Stop and cleanup
```
docker-compose -f prod.docker-compose.yaml down -v
```
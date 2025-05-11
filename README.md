# MERN Micro-services containerized with Docker

## Compose

### Start up all services

`docker compose up -d`

`docker compose up -d --build`

### Start services individually

`docker compose up client -d`

`docker compose up server -d`

### Check on services

`docker compose ps`

### Stop individual services

` docker compose stop server`

### Stop and remove individual containers and networks

`docker compose down server`

## Docker

### Jump into a container

`docker exec -it todos19-client-1 /bin/sh`

... or (for a Windows environment) ...

`winpty docker exec -it todos19-server-1 bash`

### Rebuilding

#### Auto Rebuild

Nodemon should pick up changes in server.js and automatically rebuild the server.

However, if you want to manually rebuild to pick up other changes (e.g. client), you can run the following.

`docker compose up --build -d`

#### Rebuild w/o caching

To completely rebuild without relying on cached steps, run ...

`docker compose build --no-cache server && docker compose up server -d`

### Checking logs

`docker compose logs -f --tail=1`

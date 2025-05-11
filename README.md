# MERN Micro-services containerized with Docker

## Setup

This uses Gemini Web AI's API to come up with suggestions for additional TODOs. You'll need to [create a Gemini API key](https://ai.google.dev/gemini-api/docs/api-key) and add it to a `.env` file that you add to the `todos-19-fe-app` root folder. With contents simlar to the following. Note: your API will be on the right of the assignment.

```bash
VITE_GEMINI_API_KEY=YourApiKeyGoesHere
```

Docker compose assumes the existence of this file. If you don't plan to use it, just comment out the follow lines in `compose.yml`.

```yml
    env_file:
      - ./todos-19-fe-app/.env
```

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

To bring all the containers down and rebuild them without caching, run ...

`docker compose down && docker compose build --no-cache && docker compose up -d`

### Checking logs

`docker compose logs -f --tail=1`

# Use Traefik for scaling an app in compose

```yaml
version: '3.8'

services:
  webapi:
    image: devprofr/allautomateddotnetwebapi
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.aspnetapp.rule=Host(`webapi.localhost`)"
      - "traefik.http.routers.aspnetapp.entrypoints=web"   
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - Logging__LogLevel__Default=Information
      - Application__EnforceHttps=false

  reverse-proxy:
    image: traefik
    command:
      - "--log.level=DEBUG"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
    ports:
      - "8000:80"   # The HTTP port
      - "8080:8080" # The Web UI
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
```

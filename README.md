# Ririko Dashboard
- Run `npm install` to install all dependencies
- Run `npm run build` to build the project
- Run `npm run dev` or `npm run start:android` or `npm run start:ios` to start the project
- Install JDK 21 - https://adoptium.net/

## Development with Docker

### Quick Start with Docker Compose
The easiest way to start the development environment is using Docker Compose:

```bash
docker-compose -f docker-compose.development.yml up --build
```

Once started, you can access the application at http://localhost:8100

### Manual Docker Setup
To build and run the Docker container manually:

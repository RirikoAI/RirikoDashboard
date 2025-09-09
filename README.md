# Ririko Dashboard

- Run `npm install` to install all dependencies
- Run `npm run build` to build the project
- Run `npm run dev` or `npm run start:android` or `npm run start:ios` to start the project
- Install JDK 21 - https://adoptium.net/

## Development with Docker

### Quick Start with Docker Compose

First, ensure you follow the steps in here first: https://github.com/RirikoAI/RirikoBot/tree/beta/2.0.0-dashboard?tab=readme-ov-file#development

The easiest way to start the development environment is using Docker Compose:

```bash
docker-compose -f docker-compose.development.yml up --build
```

You'd notice that the application will halt with an error about missing environment variables.
This is expected as you need to set up your config files in the `config` folder from this project directory.

```
app.config.ts:
  BACKEND_URL: 'http://192.168.0.X:3000', // use your machine's local IP address
  FRONTEND_URL: 'http://192.168.0.X:8100', // use your machine's local IP address
  
discord.config.ts:
  DISCORD_BOT_TOKEN: 'your-app-bot-token',
  DISCORD_APPLICATION_ID: 'your-application-id',
  DISCORD_REDIRECT_URI: '/v1/auth/discord/redirect',
  DISCORD_OAUTH2_CLIENT_SECRET: 'your-app-client-secret',
```

After configuring, restart your app, then it should be accessible at http://localhost:8100

### Manual Docker Setup

To build and run the Docker container manually:

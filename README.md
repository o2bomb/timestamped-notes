# timestamped-notes
Web app for taking notes on videos with timestamps 

## Running the project
Installation prerequisites:
- [Docker](https://hub.docker.com/)
- Yarn or npm

1. Create a `.env` file containing all the required environment variables needed to run both the client and the server
2. `docker-compose build`
3. `docker-compose up`
- Gain terminal access into a specific service by using `docker-compose exec service_name bash`, where `service_name` can be replaced with either `server`, `client`, `postgres` or `redis`

### Running only the server
1. Create a `.env` file containing all the required environment variables needed to run both the client and the server
2. `docker-compose build`
3. `docker-compose run --rm -p 5000:5000 server yarn dev:watch`
- The GraphQL playground can be accessed at http://localhost:5000/graphql

### Example .env file for development environment
```env
POSTGRES_PASSWORD=verysecretpassword
DATABASE_NAME=lecture-notes
REDIS_URL=redis:6379
CORS_ORIGIN=http://localhost:3000
PORT=5000
SESSION_SECRET=laksdjfpq08w439owijhdklmbsdfklqjwyhef98
NEXT_PUBLIC_GRAPHQL_SERVER_URL=http://localhost:5000/graphql
GITHUB_OAUTH_CALLBACK_URL=http://localhost:5000/auth/github/callback
```
|Environment variable|Description|
|-|-|
|`POSTGRES_PASSWORD`|Password used for accessing Postgres database|
|`DATABASE_NAME`|Name of database to be created in Postgres|
|`REDIS_URL`|Redis endpoint URL|
|`CORS_ORIGIN`|CORS origin (client URL)|
|`PORT`|Port that the Express server uses/exposes|
|`SESSION_SECRET`|Used for encrypting session data. Put a long, hard to crack string here|
|`NEXT_PUBLIC_GRAPHQL_SERVER_URL`|Endpoint that the client uses to access the GraphQL server|
|`GITHUB_OAUTH_CLIENT_ID`|GitHub OAuth client ID|
|`GITHUB_OAUTH_CLIENT_SECRET`|GitHub OAuth client secret|
|`GITHUB_OAUTH_CALLBACK_URL`|GitHub OAuth callback URL|
|`YOUTUBE_DATA_API_KEY`|API key for getting data from the YouTube Data API|
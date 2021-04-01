# timestamped-notes
Web app for taking notes on videos with timestamps 

[Live demo](https://timestamped-notes.felixtan.me/)

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
DATABASE_NAME=timestamped-notes
POSTGRES_PASSWORD=verysecretpassword
DATABASE_URL=postgresql://postgres:verysecretpassword@postgres:5432/timestamped-notes
REDIS_URL=redis:6379
COOKIE_DOMAIN=.felixtan.me
CORS_ORIGIN=http://localhost:3000
PORT=5000
SESSION_SECRET=laksdjfpq08w439owijhdklmbsdfklqjwyhef98
NEXT_PUBLIC_GRAPHQL_SERVER_URL=http://localhost:5000/graphql
GITHUB_OAUTH_CALLBACK_URL=http://localhost:5000/auth/github/callback
```
|Environment variable|Description|
|-|-|
|`DATABASE_NAME`|Name of database to be created in Postgres|
|`POSTGRES_PASSWORD`|Password used for accessing Postgres database|
|`DATABASE_URL`|Postgres connection URL|
|`REDIS_URL`|Redis connection URL|
|`COOKIE_DOMAIN`|The base domain that cookies will work on. Must be set if using subdomains in production|
|`CORS_ORIGIN`|CORS origin (client URL)|
|`PORT`|Port that the Express server uses/exposes|
|`SESSION_SECRET`|Used for encrypting session data. Put a long, hard to crack string here|
|`NEXT_PUBLIC_GRAPHQL_SERVER_URL`|Endpoint that the client uses to access the GraphQL server|
|`GOOGLE_OAUTH_CLIENT_ID`|Google OAuth client ID|
|`GOOGLE_OAUTH_CLIENT_SECRET`|Google OAuth client secret|
|`GOOGLE_OAUTH_CALLBACK_URL`|Google OAuth callback URL|
|`GITHUB_OAUTH_CLIENT_ID`|GitHub OAuth client ID|
|`GITHUB_OAUTH_CLIENT_SECRET`|GitHub OAuth client secret|
|`GITHUB_OAUTH_CALLBACK_URL`|GitHub OAuth callback URL|
|`FACEBOOK_OAUTH_CLIENT_ID`|Facebook OAuth client ID|
|`FACEBOOK_OAUTH_CLIENT_SECRET`|Facebook OAuth client secret|
|`FACEBOOK_OAUTH_CALLBACK_URL`|Facebook OAuth callback URL|
|`YOUTUBE_DATA_API_KEY`|API key for getting data from the YouTube Data API|

## Checklist for deploying the app
The backend (server) of this application is deployed on a DigitalOcean Droplet with Dokku installed. The frontend (client) is deployed on [Vercel](https://vercel.com/).

Before reading ahead, complete the following steps first:
1. Checkout the `prod` branch
2. Rebase on top of `master` branch (`git rebase master`)
3. `docker-compose down && docker-compose rm && docker volume prune` to reset Docker containers to a clean slate

### Deploying the frontend
Within the `client` directory:
1. Fix all TypeScript errors
2. [Sign up for a Vercel account](https://vercel.com/signup)
3. `npm i -g vercel@latest` to install the Vercel npm package
4. `vercel` to deploy your frontend
5. [Add a custom domain to the app](https://vercel.com/docs/custom-domains)
- `vercel --prod` for subsequent deploys (deploys to production)

### Deploying the backend
Within the `server` directory:
1. Create an `ormconfig.json` file
2. Disable database synchronisation (`synchronize: false` in `src/index.ts`)
3. Set the Postgres connection url to use the `DATABASE_URL` environment variable in `src/index.ts`
3. Edit the `Dockerfile` to include `ENV NODE_ENV production`
4. `docker-compose up --build`
5. `docker-compose exec server bash` to access the server container
6. Within the server container, run `npx typeorm migration:generate -n Initialise -d ./src/migrations` to generate a new migration for initialising the database
7. `docker-compose down` to end the docker-compose processes

Preparing Dokku for deployment:
1. SSH into the Droplet
2. `dokku apps:create timestamped-notes-server` to create a new Dokku app
3. `sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git` to install [dokku-postgres](https://github.com/dokku/dokku-postgres)
4. `sudo dokku plugin:install https://github.com/dokku/dokku-redis.git redis` to install [dokku-redis](https://github.com/dokku/dokku-redis)
5. `dokku postgres:create timestamped-notes-postgres` to create a new Postgres container
6. `dokku redis:create timestamped-notes-redis` to create a new Redis container
7. `dokku postgres:link timestamped-notes-postgres timestamped-notes-server` to link the Postgres container to the Dokku app
8. `dokku redis:link timestamped-notes-redis timestamped-notes-server` to link the Redis container to the Dokku app
9. `dokku domains:add timestamped-notes-server timestamped-notes-server.example.com` to set a subdomain for the app (`example.com` should be replaced by your own custom domain)
10. Set all environment variables in the app by running `dokku config:set timestamped-notes-server NODE_ENV=production POSTGRES_PASSWORD=postgres ...`. **Do not set the DATABASE_URL and REDIS_URL environment variables**
- `docker container list` to check that there is a Postgres and Redis container running in the background

Setting up TLS encryption:
1. SSH into the Droplet
2. `vim /etc/nginx/conf.d/00-default-vhost.conf` to an nginx config file for routing clients to the right subprojects via URL subdomains ([more info here](http://dokku.viewdocs.io/dokku/configuration/nginx/#default-site)). Insert the following code into the file:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;
    access_log off;
    return 410;
}

# To handle HTTPS requests, you can uncomment the following section.
#
# Please note that in order to let this work as expected, you need a valid
# SSL certificate for any domains being served. Browsers will show SSL
# errors in all other cases.
#
# Note that the key and certificate files in the below example need to
# be copied into /etc/nginx/ssl/ folder.
#
# server {
#     listen 443 ssl;
#     listen [::]:443 ssl;
#     server_name _;
#     ssl_certificate /etc/nginx/ssl/cert.crt;
#     ssl_certificate_key /etc/nginx/ssl/cert.key;
#     access_log off;
#     return 410;
# }
```
3. `service nginx reload` to reload nginx
4. `sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git` to install [dokku-letsencrypt](https://github.com/dokku/dokku-letsencrypt)
5. `dokku config:set --no-restart timestamped-notes-server DOKKU_LETSENCRYPT_EMAIL=your@email.com` to set the required environment variable for letsencrypt to work (replace `your@email.com` with your own email)
6. `dokku letsencrypt timestamped-notes-server` to set up TLS
- `dokku domains:report timestamped-notes-server` to check the domains for the Dokku app
- `dokku proxy:report timestamped-notes server` to check proxies

### deploy.sh
`deploy.sh` can be executed to for subsequent deploys to Dokku (might need to set execution permissions with `chmod +x deploy.sh`). The following steps are executed in this script:
1. Builds the server's Docker image and tags it
2. Pushes the server's Docker image to [Docker Hub](https://hub.docker.com/)
3. SSH's into the DigitalOcean Droplet
4. Once in the Droplet, it pulls the server's Docker image, tags it and deploys it using Dokku

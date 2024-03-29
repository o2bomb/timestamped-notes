declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_NAME: string;
    POSTGRES_PASSWORD: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    COOKIE_DOMAIN: string;
    CORS_ORIGIN: string;
    PORT: string;
    SESSION_SECRET: string;
    NEXT_PUBLIC_GRAPHQL_SERVER_URL: string;
    GOOGLE_OAUTH_CLIENT_ID: string;
    GOOGLE_OAUTH_CLIENT_SECRET: string;
    GOOGLE_OAUTH_CALLBACK_URL: string;
    GITHUB_OAUTH_CLIENT_ID: string;
    GITHUB_OAUTH_CLIENT_SECRET: string;
    GITHUB_OAUTH_CALLBACK_URL: string;
    TWITTER_OAUTH_CONSUMER_KEY: string;
    TWITTER_OAUTH_CONSUMER_SECRET: string;
    TWITTER_OAUTH_CALLBACK_URL: string;
    FACEBOOK_OAUTH_CLIENT_ID: string;
    FACEBOOK_OAUTH_CLIENT_SECRET: string;
    FACEBOOK_OAUTH_CALLBACK_URL: string;
    YOUTUBE_DATA_API_KEY: string;
  }
}

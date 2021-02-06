declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_PASSWORD: string;
    DATABASE_NAME: string;
    REDIS_URL: string;
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
    YOUTUBE_DATA_API_KEY: string;
  }
}

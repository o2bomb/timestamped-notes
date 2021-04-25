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
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    CORS_ORIGIN: string;
    PORT: string;
    SESSION_SECRET: string;
    NEXT_PUBLIC_GRAPHQL_SERVER_URL: string;
  }
}

import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import { createConnection } from "typeorm";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { Todo } from "./entities/Todo";
import { TodoResolver } from "./resolvers/todo";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.DATABASE_NAME}`,
    logging: true,
    synchronize: true, // makes sure entities are synced with database. dont use in prod
    entities: [Todo],
    migrations: [path.join(__dirname, "./migrations/*")],
  });
  // await conn.runMigrations();

  const app = express();

  // CORS
  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  };

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }) as session.Store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // lasts 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // cookie only works in https (in prod)
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, TodoResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  // ROUTES
  app.get("/hello", (_, res) => res.send("Hello World!"));

  // if (process.env.NODE_ENV === "production") {
  //   app.use("/", express.static(path.join(__dirname, "..", "client", "dist")));
  //   app.use("/public", express.static(path.join(__dirname, "..", "client", "public")));
  // }

  app.listen(parseInt(process.env.PORT), () => {
    console.log("Express server started on port", process.env.PORT);
  });
}

main().catch((error) => {
  console.error(error);
})
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import cors from "cors";
import connectRedis from "connect-redis";
import passport from "passport";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Lecture } from "./entities/Lecture";
import { Note } from "./entities/Note";
import { User } from "./entities/User";
import { NoteResolver } from "./resolvers/note";
import { LectureResolver } from "./resolvers/lecture";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME, __prod__ } from "./constants";

import "./passport";
import { YouTubeResolver } from "./resolvers/youtube";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.DATABASE_NAME}`,
    logging: true,
    synchronize: true, // makes sure entities are synced with database. dont use in prod
    entities: [Lecture, Note, User],
    migrations: [path.join(__dirname, "./migrations/*")],
  });
  // await conn.runMigrations();

  const app = express();

  // SESSION AND COOKIES
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
        maxAge: 1000 * 60 * 60 * 24 * 30, // lasts 30 days
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // cookie only works in https (in prod)
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  // PASSPORT
  app.use(passport.initialize());
  app.use(passport.session());

  // GRAPHQL AND CORS
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [LectureResolver, NoteResolver, UserResolver, YouTubeResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });
  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  };
  app.use(cors(corsOptions));
  apolloServer.applyMiddleware({ app, cors: false });

  // ROUTES
  app.get("/", (req: any, res) => {
    res.send(req.user);
  });

  app.get("/logout", (req, res) => {
    req.session.destroy(function (_) {
      res.redirect("/");
    });
  });

  app.get("/auth/error", (_, res) => {
    res.send("Authentication error. Please try again");
  });

  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ['email', 'profile'] })
  );
  
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook")
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/auth/error" }),
    (_, res) => {
      res.redirect(`${process.env.CORS_ORIGIN}`);
    }
  );
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/error" }),
    (_, res) => {
      res.redirect(`${process.env.CORS_ORIGIN}`);
    }
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/auth/error" }),
    (_, res) => {
      res.redirect(`${process.env.CORS_ORIGIN}`);
    }
  );

  // Needed for accessing req.user within GraphQL resolvers
  // app.use("/graphql", passport.authenticate("github", { session: true }));

  // if (process.env.NODE_ENV === "production") {
  //   app.use("/", express.static(path.join(__dirname, "..", "client", "dist")));
  //   app.use("/public", express.static(path.join(__dirname, "..", "client", "public")));
  // }

  app.listen(parseInt(process.env.PORT), () => {
    console.log("Express server started on port", process.env.PORT);
  });
};

main().catch((error) => {
  console.error(error);
});

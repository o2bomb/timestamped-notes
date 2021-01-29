import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id as any);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      return done(null, profile);
    }
  )
);
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { User } from "./entities/User";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done) => {
  done(null, {
    id
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
    },
    async (_: string, __: string, profile: any, done: any) => {
      // This function is called when user authorizes this app
      // to access GitHub data (i.e. they visit the /auth/github endpoint,
      // and then click on the "Allow" button in the GitHub auth page)
      // const [{ exists }] = await User.query(
      //   isExistsQuery(
      //     User.createQueryBuilder()
      //       .select("*")
      //       .where(`"githubId" = ${profile.id}`)
      //       .getQuery()
      //   )
      // );
      let user = await User.findOne({
        where: {
          githubId: profile.id,
        },
      });

      if (!user) {
        user = await User.create({
          githubId: profile.id,
          displayName: profile.displayName,
          avatarUrl: profile._json.avatar_url,
        }).save();
      }

      // user object is passed to serializeUser()
      return done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL
    },
    async (_: string, __: string, profile: any, done: any) => {
      let user = await User.findOne({
        where: {
          googleId: profile.id,
        },
      });

      console.log(profile);

      let avatarUrl = "";
      if (profile.photos) {
        if (profile.photos.length > 0) {
          avatarUrl = profile.photos[0].value;
        }
      }

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          avatarUrl
        }).save();
      }

      // user object is passed to serializeUser()
      return done(null, user);
    }
  )
)
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "./entities/User";

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

      return done(null, user);
    }
  )
);

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "933240470261-d4fvjtcj6e47c4td60rud6eb5jj5102o.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_SECRET = "96b8336e1b3c3074406065dc1abd99b3fe78405c";

const GITHUB_CLIENT_ID = "c6a35a92493b5748875f";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://blog-api-3tml.onrender.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, callback) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      callback(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "https://blog-api-3tml.onrender.com/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, callback) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

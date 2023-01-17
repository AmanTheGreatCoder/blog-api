const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = "https://blog-app-ijxe.onrender.com";

router.get("/login/failed", (req, res) => {
  res.status(401).json("login failed");
});

// change this to profile endpoint
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.sendStatus(401);
  }
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;

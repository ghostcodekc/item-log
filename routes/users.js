const express = require("express");
const { auth, requiresAuth } = require('express-openid-connect');
const router = express.Router();

// Log a user in
// app.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
// });
router.get('/login', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
  user = req.oidc.user;
  res.redirect("/");
});

// Log a user out -- Auth0 Handles this for us at /logout
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });


module.exports = router;
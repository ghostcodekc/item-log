require('dotenv').config();
const createError = require("http-errors");
const express = require('express');
const path = require("path");
const { auth, requiresAuth } = require('express-openid-connect');
const dashboardRouter = require("./routes/dashboard");
const publicRouter = require("./routes/public");
const profileRouter = require('./routes/profile');
const usersRouter = require("./routes/users");

// App initialization
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
    })
);

// Routes
app.use("/", publicRouter);
app.use("/dashboard", requiresAuth(), dashboardRouter);
app.use("/profile", requiresAuth(), profileRouter);
app.use("/users", usersRouter);

// Error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
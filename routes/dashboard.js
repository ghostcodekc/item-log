const express = require("express");


const router = express.Router();

// Display the dashboard page
router.get("/", (req, res) => {
  res.render("dashboard");
  console.log(user);
});

module.exports = router;
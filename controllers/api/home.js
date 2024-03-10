const router = require("express").Router();

// Route for test purposes
router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;

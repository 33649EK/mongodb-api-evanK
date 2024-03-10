const router = require("express").Router();
const userRoutes = require("./users");
const thoughtRoutes = require("./thoughts");
const homeRoutes = require("./home");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
router.use("/", homeRoutes);

module.exports = router;
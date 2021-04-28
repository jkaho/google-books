const router = require("express").Router();
const bookRoutes = require("./books");

router.use("/books", bookRoutes);

module.exports = router;
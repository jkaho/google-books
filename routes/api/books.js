const router = require("express").Router();
const booksController = require("../../controllers/booksController");

router.route("/")
  .get(booksController.getAll)
  .post(booksController.save);

router.route("/:id")
  .delete(booksController.delete);

module.exports = router;
const router = require("express").Router();
import booksController from "../controllers/booksController";

router.route("/")
  .get(booksController.getAll);

router.route("/:id")
  .post(booksController.save)
  .delete(booksController.delete);

module.exports = router;
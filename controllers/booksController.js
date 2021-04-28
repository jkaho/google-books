const db = require("../models");

const booksController = {
  getAll: function(req, res) {
    db.Book
      .find({})
      .then(model => res.json(model))
      .catch(err => res.status(422).json(err))
  },
  save: function(req, res) {
    db.Book
      .create({
        bookId: req.body.id,
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        link: req.body.link,
        image: req.body.image
      })
      .then(model => res.json(model))
      .catch(err => res.status(422).json(err))
  },
  delete: function(req, res) {
    db.Book
      .deleteOne({ bookId: req.params.id })
      .then(model => res.json(model))
      .catch(err => res.status(422).json(err))
  }
}

module.exports = booksController;
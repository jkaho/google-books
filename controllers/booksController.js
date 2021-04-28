import db from "../models";

module.exports = {
  getAll: function(req, res) {
    db.Book
      .findAll()
      .then(model => res.json(model))
      .catch(err => res.status(422).json(err))
  },
  save: function(req, res) {
    db.Book
      .create({
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        link: req.body.link,
        image: req.body.link
      })
      .then(model => res.json(model))
      .catch(err => res.status(422).json(err))
  },
  delete: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(model => model.remove())
      .then(model => res.json(model))
      .catch(err => res.status(422).json(err))
  }
}
const db = require("../models");
const axios = require("axios");

// Defining methods for the booksController
module.exports = {

  trytofindthis: function(req, res) {
    if (!req.query.q) {
      req.query.q = "battleroyal";
    }
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${
          req.query.q
        }&maxResults=20`
      )
      .then(results => {
        res.json([...results.data.items]);
      })
      .catch(err => console.log(err));
  },

  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

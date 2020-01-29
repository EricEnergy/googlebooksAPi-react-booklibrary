const router = require("express").Router();
const booksController = require("../../controllers/booksController");



router
  .route("/library")
  .get(booksController.trytofindthis)

module.exports = router;
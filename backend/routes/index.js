const router = require('express').Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');

router.use(
  usersRouter,
  cardsRouter,
);

module.exports = router;

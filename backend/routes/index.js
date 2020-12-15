const router = require('express').Router();

const auth = require('./auth');
const cardsRouter = require('./cards');
const usersRouter = require('./users');

router.use(
  auth,
  usersRouter,
  cardsRouter,
);

module.exports = router;

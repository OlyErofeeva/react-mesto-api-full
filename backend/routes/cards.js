const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { urlRegex, mongoIdRegex } = require('../utils/regex');

router.use(auth);

// GET: массив карточек
router.get('/cards', getCards);

// POST: новая карточка
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .trim(),
    link: Joi.string().required().pattern(new RegExp(urlRegex)),
  }),
}), createCard);

// DELETE: удалить карточку по id
router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(new RegExp(mongoIdRegex)),
  }),
}), removeCard);

// PUT: поставить лайк на карточку по id
router.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(new RegExp(mongoIdRegex)),
  }),
}), likeCard);

// DELETE: удалить лайк с карточки по id
router.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(new RegExp(mongoIdRegex)),
  }),
}), dislikeCard);

module.exports = router;

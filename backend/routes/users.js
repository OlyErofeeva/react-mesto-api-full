const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const {
  getUser,
  getCurrentUser,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const { urlRegex, mongoIdRegex } = require('../utils/regex');

router.use(auth);

// GET: массив пользователей
router.get('/users', getUsers);

// GET: данные текущего пользователя
router.get('/users/me', getCurrentUser);

// GET: данные одного пользователя по id
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(new RegExp(mongoIdRegex)),
  }),
}), getUser);

// PATCH: обновление имени и bio текущего пользователя
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

// PATCH: обновление аватара текущего пользователя
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(urlRegex)),
  }),
}), updateUserAvatar);

module.exports = router;

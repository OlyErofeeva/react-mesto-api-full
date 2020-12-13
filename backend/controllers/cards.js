const Card = require('../models/card');
const { defaultErrorHandler, validationErrorHandler } = require('../utils/controllerErrorHandlers');

const sendCardIfExists = (card, res) => {
  if (card) {
    res.send(card);
  } else {
    res.status(404).send({ message: 'Нет карточки с таким id' });
  }
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => defaultErrorHandler(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user,
  })
    .then((card) => res.send(card))
    .catch((err) => validationErrorHandler(err, res));
};

module.exports.removeCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => sendCardIfExists(card, res))
    .catch((err) => defaultErrorHandler(err, res));
};

module.exports.likeCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => sendCardIfExists(card, res))
    .catch((err) => defaultErrorHandler(err, res));
};

module.exports.dislikeCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => sendCardIfExists(card, res))
    .catch((err) => defaultErrorHandler(err, res));
};

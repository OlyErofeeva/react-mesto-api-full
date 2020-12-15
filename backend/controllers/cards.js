const Card = require('../models/card');
const validationErrorHandler = require('../utils/validation-error-handler');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const sendCardIfExists = (card, res) => {
  if (card) {
    res.send(card);
  } else {
    throw new NotFoundError('Нет карточки с таким id');
  }
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user,
  })
    // because populate doesn't work after Card.create:
    .then((card) => Card.findById(card._id).populate(['owner', 'likes']))
    .then((card) => res.send(card))
    .catch((err) => validationErrorHandler(err, next));
};

module.exports.removeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }

      // suddenly, card.owner._id is an object
      if (card.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав на удаление выбранной карточки');
      }

      return Card.findByIdAndRemove(id)
        .populate(['owner', 'likes'])
        .then(() => res.send(card))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => sendCardIfExists(card, res))
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => sendCardIfExists(card, res))
    .catch((err) => next(err));
};

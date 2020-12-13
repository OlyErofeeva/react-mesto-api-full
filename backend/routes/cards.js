const router = require('express').Router();
const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', removeCard);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', dislikeCard);

module.exports = router;

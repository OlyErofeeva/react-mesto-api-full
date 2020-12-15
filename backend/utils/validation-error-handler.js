const BadRequestError = require('../errors/bad-request-error');

const validationErrorHandler = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new BadRequestError(err.message));
  } else if (err.statusCode) {
    next(err);
  } else {
    next(new Error());
  }
};

module.exports = validationErrorHandler;

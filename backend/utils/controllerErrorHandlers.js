module.exports.validationErrorHandler = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
};

module.exports.defaultErrorHandler = (err, res) => {
  res.status(500).send({ message: err.message });
};

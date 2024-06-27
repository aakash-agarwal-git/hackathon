function validate(schema, type = 'body') {
  return (req, res, next) => {
    const { error } = schema.validate(req[type]);
    if (error) {
      return res.status(400).json(error);
    } else {
      return next();
    }
  };
}

module.exports = {
    validate
}
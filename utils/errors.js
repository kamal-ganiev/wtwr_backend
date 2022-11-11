const checkExistence = (error, res, req, next) => {
  if (error.status === 404) {
    res.send({
      message: "Requested resource not found",
    });

    return;
  }

  next();
};

module.exports = { checkExistence };

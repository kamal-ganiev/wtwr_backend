const checkExistence = (res) => {
  if (res.status === 404) {
    res.send({
      message: "Requested resource not found",
    });

    return;
  }

  next();
};

module.exports = { checkExistence };

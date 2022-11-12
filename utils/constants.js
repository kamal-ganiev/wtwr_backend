/// Server Port Constant \\\

const { PORT = 3001 } = process.env;

/// Accepted Requests \\\

const completedRequest = (result, respond) => {
  respond.status(200).send(result);
};

const completedCreateRequst = (result, respond) => {
  respond.status(201).send(result);
};

const completedRequestWithEmptyRespond = (result, respond) => {
  respond.status(204);
};

module.exports = {
  PORT,
  completedRequest,
  completedCreateRequst,
  completedRequestWithEmptyRespond,
};

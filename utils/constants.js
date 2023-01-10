/// Server Port Constant \\\

const { PORT = 3002 } = process.env;

/// Accepted Requests \\\

const completedRequest = (result, respond) => {
  respond.send(result);
};

const completedCreateRequst = (result, respond) => {
  respond.status(201).send(result);
};

/// Turning On Update Validators \\\

const opts = { runValidators: true, new: true };

module.exports = {
  PORT,
  completedRequest,
  completedCreateRequst,
  opts,
};

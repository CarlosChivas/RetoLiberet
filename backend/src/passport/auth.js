const ctrlAuth = {};

ctrlAuth.user = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(400).send("You aren't logged in");
}

module.exports = ctrlAuth
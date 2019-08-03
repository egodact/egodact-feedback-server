const sendNotFoundResponse = res =>
  res.status(404).json({
    error_description: 'Not found. Try using POST /feedback/create'
  });

module.exports = sendNotFoundResponse;

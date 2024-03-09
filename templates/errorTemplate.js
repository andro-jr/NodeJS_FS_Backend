const errorTemplate = (res, err, message) => {
  return res.json({
    error: {
      message: message || err.message,
      status: err.status,
    },
  });
};

module.exports = errorTemplate;

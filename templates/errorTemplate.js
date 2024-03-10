const errorTemplate = (res, err, message) => {
  return res.status(501).json({
    error: {
      message: message || err.message,
      status: err.status,
    },
  });
};

module.exports = errorTemplate;

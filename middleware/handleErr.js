const errorHandler = (err, req, res, next) => {
  console.log(err, 2);
  let statusCode = 500;
  let msg = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    msg = err.errors[0].message;
  }

  res.status(statusCode).json({ msg });
};

module.exports = errorHandler;

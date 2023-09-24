const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const CustomAPIError = require("./custom-api");
const BadRequestError = require("./bad-request");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};

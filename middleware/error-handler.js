const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
//validation error means we provide less data to it.
  if(err.name === 'ValidationError'){
    
    customError.msg = Object.values(err.errors).map(el=> el.message).join(",")
    customError.statusCode = 400
 // console.log(customError)
  }
//Cast error means -> if we provide wrong size of( _id) or wrong value in monogodb it will give 
if (err.name === 'CastError') {
  customError.msg = `No item found with id : ${err.value} and it is cast error`
  customError.statusCode = 404
}
//Its for duplicate one
if (err.code && err.code === 11000) {
  customError.msg = `Duplicate value entered for ${Object.keys(
    err.keyValue
  )} field, please choose another value`
  customError.statusCode = 400
}
  return res.status(customError.statusCode).json({err:customError.msg});
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });

};

module.exports = errorHandlerMiddleware;
//How we are doing earlier
/*
const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
 // console.log(CustomAPIError);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;

*/

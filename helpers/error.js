// class ErrorHandler extends Error {
//   constructor(statusCode, message) {
//     super();
//     this.statusCode = statusCode;
//     this.message = message;
//   }
// };
// const handleError = (err, res) => {
//   console.log(err);
//   // if(!err.statusCode) err.statusCode = 500;
//   if(!err.message) err.message = err.errmsg;
//   const { statusCode, message } = err;
//   res.status(statusCode).json({
//     status: "error",
//     statusCode,
//     message
//   });
// };
// module.exports = {
//   ErrorHandler,
//   handleError
// }

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;


// /**
//  * @desc    Send any error response
//  *
//  * @param   {string} message
//  * @param   {number} statusCode
//  */
//  exports.error = (message, statusCode) => {
//   // List of common HTTP request code
//   const codes = [200, 201, 400, 401, 404, 403, 422, 500];

//   // Get matched code
//   const findCode = codes.find((code) => code == statusCode);

//   if (!findCode) statusCode = 500;
//   else statusCode = findCode;

//   return {
//     message,
//     code: statusCode,
//     error: true
//   };
// };
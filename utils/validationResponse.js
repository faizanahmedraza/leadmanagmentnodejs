/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
 module.exports.validation = (errors) => {
    return {
      message: "Validation errors",
      error: true,
      code: 422,
      errors
    };
  };
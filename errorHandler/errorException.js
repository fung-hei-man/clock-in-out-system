const { ERROR_CODE } = require('./errorCode')

class ErrorException extends Error {
  status = null
  code = null
  message = null

  constructor(code, message) {
    super(code)

    this.code = code
    this.status = 500
    this.message = message

    switch (code) {
    case ERROR_CODE.VALIDATION_ERROR:
      this.status = 400
      break
    case ERROR_CODE.NOT_FOUND:
      this.status = 404
      break
    default:
      this.status = 500
      break
    }
  }
}

module.exports = {
  ErrorException
}

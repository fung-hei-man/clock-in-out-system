const { isMatch } = require('date-fns')
const { ERROR_CODE } = require('../errorHandler/errorCode')
const { ErrorException } = require('../errorHandler/errorException')
const timeStringToMinutes = (timeString) => {
  return timeString === null ? null : parseInt(timeString.split(':')[0]) * 60 + parseInt(timeString.split(':')[1])
}

const checkDateFormat = (dateStr) => {
  if (!isMatch(dateStr, 'yyyy-MM-dd')) {
    throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, 'Date format is `yyyy-MM-dd`')
  }
}

module.exports = {
  timeStringToMinutes,
  checkDateFormat,
}

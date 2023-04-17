const { isMatch, parse} = require('date-fns')
const { ERROR_CODE } = require('../errorHandler/errorCode')
const { ErrorException } = require('../errorHandler/errorException')

const timeStringToMinutes = (timeString) => {
  return timeString === null ? null : parseInt(timeString.split(':')[0]) * 60 + parseInt(timeString.split(':')[1])
}

const datetimeStringToDate = (str) => {
  const converted = str === null ? null : parse(str, 'yyyy-MM-dd HH:mm', new Date())

  if (isNaN(converted) || !converted instanceof Date) {
    throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, 'DateTime format is `yyyy-MM-dd HH:mm`')
  }

  return converted
}

const checkDateFormat = (dateStr) => {
  if (!isMatch(dateStr, 'yyyy-MM-dd')) {
    throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, 'Date format is `yyyy-MM-dd`')
  }
}

module.exports = {
  timeStringToMinutes,
  datetimeStringToDate,
  checkDateFormat,
}

const { ERROR_CODE } = require('../errorHandler/errorCode')
const { ErrorException } = require('../errorHandler/errorException')
const { checkDateFormat } = require('../helper/datetime.helper')
const service = require('../service/employee.service')

const queryByDateAndClockInTime = async (req, res, next) => {
  try {
    const date = req.params.date
    const order = req.query.order
    let limit = req.query.limit

    // param checking
    checkDateFormat(date)
    limit = limit === undefined ? null : parseInt(limit)
    if (isNaN(limit)) throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, 'Failed to parse `limit` to number')

    let result = []
    if (order === undefined) {
      result = await service.getEmployeesByClockDate(date)
    } else if (order === 'early') {
      result = await service.getEmployeesWithEarliestClockInByDate(date, limit)
    } else {
      throw new ErrorException(ERROR_CODE.NOT_IMPLEMENTED, 'Only `early` order is implemented now')
    }

    res.send(result)

  } catch (err) {
    console.error(err)
    next(err)
  }
}

const queryByDateRangeAndClockInStatus = async (req, res, next) => {
  try {
    const from = req.params.from
    const to = req.params.to
    const status = req.query.status

    // param checking
    checkDateFormat(from)
    checkDateFormat(to)
    if (status === undefined) {
      throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, 'Missing `status` query parameter')
    }

    let result = []
    if (status === 'incomplete') {
      result = await service.getEmployeesByClockDateRangeAndNoClockOut(from, to)
    } else {
      throw new ErrorException(ERROR_CODE.NOT_IMPLEMENTED, 'Only `incomplete` status is implemented now')
    }

    res.send(result)

  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  queryByDateAndClockInTime,
  queryByDateRangeAndClockInStatus,
}

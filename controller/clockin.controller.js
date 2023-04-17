const { ERROR_CODE } = require('../errorHandler/errorCode')
const { ErrorException } = require('../errorHandler/errorException')
const clockInService = require('../service/clockin.service')
const employeeService = require('../service/employee.service')
const { datetimeStringToDate } = require('../helper/datetime.helper')
const { validateClockInOutPair } = require('../service/attendance.service')

const clockInOrClockOut = async (req, res, next) => {
  try {
    const { employeeNumber } = req.body

    // param checking
    let employee = await employeeService.getByEmployeeNum(employeeNumber)
    if (employee.length === 0) {
      throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, 'Employee with the `employeeNumber` not found')
    }

    const { updatedField } = await clockInService.clockInOrOut(employeeNumber)

    let response = updatedField === null ? 'Clock in/out record not updated, maybe you have already clock out today' :
      `Successfully ${updatedField}`
    res.send(response)

  } catch (err) {
    next(err)
  }
}

const makeUpClockInOrClockOut = async (req, res, next) => {
  try {
    let { employeeNumber, clockIn, clockOut } = req.body

    // param checking
    let employee = await employeeService.getByEmployeeNum(employeeNumber)
    if (employee.length === 0) {
      throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, 'Employee with the `employeeNumber` not found')
    }

    clockIn = clockIn === undefined ? null : clockIn
    clockOut = clockOut === undefined ? null : clockOut
    const clockInDateTime = datetimeStringToDate(clockIn)
    const clockOutDateTime = datetimeStringToDate(clockOut)
    validateClockInOutPair(clockInDateTime, clockOutDateTime)

    const { updatedFields } = await clockInService.makeUpClockInOrOut(employeeNumber, clockIn, clockOut, clockInDateTime, clockOutDateTime)

    let response = updatedFields.length === 0 ? 'No field is updated' : `Updated fields: ${ updatedFields }`
    res.send(response)

  } catch (err) {
    next(err)
  }
}

module.exports = {
  clockInOrClockOut,
  makeUpClockInOrClockOut,
}

const repo = require('../repo/attendance.repo')
const { hoursToMinutes, isBefore, isSameDay} = require('date-fns')
const { timeStringToMinutes } = require('../helper/datetime.helper')
const { ErrorException } = require('../errorHandler/errorException')
const {ERROR_CODE} = require('../errorHandler/errorCode')
const REST_START = hoursToMinutes(12) // 12:00
const REST_END = hoursToMinutes(13.5) // 13:30

const getAttendancesByDate = (date) => {
  console.log(`Query attendance records of ${date}`)
  return repo.getByDate(date)
}

const generateAttendanceResponse = (attendances) => {
  return attendances.map(attendance => {

    const clockIn = timeStringToMinutes(attendance.clock_in)
    const clockOut = timeStringToMinutes(attendance.clock_out)

    const restTime = calculateRestTime(clockIn, clockOut)

    return {
      employeeNum: attendance.employee_num,
      clockIn: attendance.clock_in,
      clockOut: attendance.clock_out,
      restTime,
      workTime: calculateWorkTime(restTime, clockIn, clockOut),
    }
  })
}

const calculateRestTime = (clockIn, clockOut) => {
  if (clockIn === null || clockOut === null) return null

  // clock in after lunch or clock out before lunch
  if (clockIn > REST_END || clockOut < REST_START) return 0

  // clock in during lunch
  if (REST_START < clockIn && clockIn < REST_END) return (REST_END - clockIn) / 60

  // clock out during lunch
  if (REST_START < clockOut && clockOut < REST_END) return (clockOut - REST_START) / 60

  // normal clock in/out time
  return (REST_END - REST_START) / 60
}

const calculateWorkTime = (restTime, clockIn, clockOut) => {
  if (clockIn === null || clockOut === null) return null

  const inOutDiff = (clockOut - clockIn) / 60
  return restTime === null ? inOutDiff : inOutDiff - restTime
}

const validateClockInOutPair = (clockInDateTime, clockOutDateTime) => {
  if (clockInDateTime === null && clockOutDateTime === null) {
    throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, '`clockIn` and `clockOut` cannot be null at the same time')

  } else if (clockInDateTime === null || clockOutDateTime === null) {
    return true

  } else if (isBefore(clockOutDateTime, clockInDateTime)) {
    throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, '`clockOut` must be after `clockIn')

  } else if (!isSameDay(clockOutDateTime, clockInDateTime)) {
    throw new ErrorException(ERROR_CODE.VALIDATION_ERROR, '`clockIn` and `clockOut` must be on the same day')
  }
}

module.exports = {
  getAttendancesByDate,
  generateAttendanceResponse,
  calculateRestTime,
  calculateWorkTime,
  validateClockInOutPair
}

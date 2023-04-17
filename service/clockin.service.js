const repo = require('../repo/attendance.repo')
const { lightFormat, getHours, getMinutes } = require('date-fns')
const { CLOCK_TYPE } = require('../helper/attendance.dict')
const { timeStringToMinutes, datetimeStringToDate } = require('../helper/datetime.helper')
const { validateClockInOutPair } = require('./attendance.service')

const clockInOrOut = async (employeeNum) => {
  const date = new Date()
  const today = lightFormat(date, 'yyyy-MM-dd')
  const targetTimeStr = `${getHours(date)}:${getMinutes(date)}:00`

  const existing = await repo.getByEmployeeAndDate(employeeNum, today)
  let updatedField = null

  // clock in or out depend on time
  // assume clock in after lunch = forget to clock in and is in fact clock out
  if (existing.length === 0) {
    const targetTimeMin = timeStringToMinutes(targetTimeStr)
    const restEndMin = timeStringToMinutes('13:30:00')

    if (targetTimeMin < restEndMin) {
      await repo.insert(employeeNum, today, targetTimeStr, null)
      updatedField = CLOCK_TYPE.IN

    } else {
      await repo.insert(employeeNum, today, null, targetTimeStr)
      updatedField = CLOCK_TYPE.OUT
    }

  // clock in already, clock out now
  } else if (existing[0].clock_in !== null && existing[0].clock_out === null) {
    await repo.updateClockOut(employeeNum, today, targetTimeStr)
    updatedField = CLOCK_TYPE.OUT
  }

  return { updatedField }
}

const makeUpClockInOrOut = async (employeeNum, clockIn, clockOut, clockInDateTime, clockOutDateTime) => {
  const dateStr = clockIn !== null ? clockIn.split(' ')[0] : clockOut.split(' ')[0]
  const clockInTimeStr = clockIn === null ? null : `${clockIn.split(' ')[1]}:00`
  const clockOutTimeStr = clockOut === null ? null : `${clockOut.split(' ')[1]}:00`

  const existing = await repo.getByEmployeeAndDate(employeeNum, dateStr)

  // no record before, just push current record to db
  if (existing.length === 0) {
    await repo.insert(employeeNum, dateStr, clockInTimeStr, clockOutTimeStr)

    if (clockIn === null) return { updatedFields: [CLOCK_TYPE.OUT] }
    if (clockOut === null) return { updatedFields: [CLOCK_TYPE.IN] }
    return { updatedFields: [CLOCK_TYPE.IN, CLOCK_TYPE.OUT] }
  }

  const currentClockIn = existing[0].clock_in
  const currentClockOut = existing[0].clock_out
  let updatedFields = []

  // ignore makeup req if db already has the data
  // as either in or out record exist, wont execute both if statement
  if (currentClockIn === null && clockIn !== null) {
    validateClockInOutPair(clockInDateTime, datetimeStringToDate(`${dateStr} ${currentClockOut.substring(0, currentClockOut.length - 3)}`))

    await repo.updateClockIn(employeeNum, dateStr, clockInTimeStr)
    updatedFields.push(CLOCK_TYPE.IN)
  }

  if (currentClockOut === null && clockOut !== null) {
    validateClockInOutPair(datetimeStringToDate(`${dateStr} ${currentClockIn.substring(0, currentClockIn.length - 3)}`), clockOutDateTime)

    await repo.updateClockOut(employeeNum, dateStr, clockOutTimeStr)
    updatedFields.push(CLOCK_TYPE.OUT)
  }

  return { updatedFields: updatedFields }
}

module.exports = {
  clockInOrOut,
  makeUpClockInOrOut,
}

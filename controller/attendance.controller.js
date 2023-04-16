const { lightFormat } = require('date-fns')
const service = require('../service/attendance.service')
const { checkDateFormat } = require('../helper/datetime.helper')

const queryAttendancesOfToday = async (req, res, next) => {
  try {
    const today = lightFormat(new Date(), 'yyyy-MM-dd')
    const attendances = await service.getAttendancesByDate(today)
    const result = service.generateAttendanceResponse(attendances)
    res.send(result)

  } catch (err) {
    next(err)
  }
}

const queryAttendancesByDate = async (req, res, next) => {
  try {
    const date = req.params.date
    checkDateFormat(date)

    const attendances = await service.getAttendancesByDate(date)
    const result = service.generateAttendanceResponse(attendances)
    res.send(result)

  } catch (err) {
    next(err)
  }
}

module.exports = {
  queryAttendancesOfToday,
  queryAttendancesByDate,
}

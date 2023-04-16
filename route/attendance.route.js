const express = require('express')
const controller = require('../controller/attendance.controller')
const attendanceRouter = express.Router()

attendanceRouter.get('/today', controller.queryAttendancesOfToday)
attendanceRouter.get('/date/:date', controller.queryAttendancesByDate)

module.exports = { attendanceRouter }


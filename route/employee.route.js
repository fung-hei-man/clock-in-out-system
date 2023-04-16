const express = require('express')
const controller = require('../controller/employee.controller')
const employeeRouter = express.Router()

employeeRouter.get('/clockin/date/:date', controller.queryByDateAndClockInTime)
employeeRouter.get('/clockin/from/:from/to/:to', controller.queryByDateRangeAndClockInStatus)

module.exports = { employeeRouter }


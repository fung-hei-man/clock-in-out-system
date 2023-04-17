const express = require('express')
const controller = require('../controller/clockin.controller')
const clockInRouter = express.Router()

clockInRouter.post('/', controller.clockInOrClockOut)
clockInRouter.put('/', controller.makeUpClockInOrClockOut)

module.exports = { clockInRouter }

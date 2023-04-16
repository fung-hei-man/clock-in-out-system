const express = require('express')
const morgan = require('morgan')
const { attendanceRouter } = require('../route/attendance.route')
const { employeeRouter } = require('../route/employee.route')
const { ERROR_CODE } = require('../errorHandler/errorCode')
const { ErrorException } = require('../errorHandler/errorException')

const app = express()
app.use(morgan('common'))

app.use(`/api/${process.env.API_VERSION}/attendances/`, attendanceRouter)
app.use(`/api/${process.env.API_VERSION}/employees/`, employeeRouter)

function customErrorHandler (err, req, res, next) {
  console.error(`Error occurred when processing api request: ${err.code}`)
  console.error(err)

  if (err instanceof ErrorException) {
    res.status(err.status).send(err)
  } else {
    res.status(500).send({ code: ERROR_CODE.UNKNOWN, status: 500 })
  }
}

app.use(customErrorHandler)

module.exports = { app }

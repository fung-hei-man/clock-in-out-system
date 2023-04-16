const express = require('express')
const morgan = require('morgan')
const { ERROR_CODE } = require('../errorHandler/errorCode')
const { ErrorException } = require('../errorHandler/errorException')

const app = express()
app.use(morgan('common'))


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

const { db } = require('../config/mysql')
const { ErrorException } = require('../errorHandler/errorException')
const { ERROR_CODE } = require('../errorHandler/errorCode')

const getByDate = (date) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT employee_num, clock_in, clock_out, clock_date FROM attendances WHERE clock_date = ?',
      [date],
      function (err, results) {
        if (err) reject(new ErrorException(ERROR_CODE.DB_ERROR, err.sqlMessage))
        resolve(results)
      }
    )
  })
}

const getByEmployeeAndDate = (employeeNum, date) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT employee_num, clock_in, clock_out, clock_date FROM attendances 
            WHERE employee_num = ? AND clock_date = ?`,
      [employeeNum, date],
      function (err, results) {
        if (err) reject(new ErrorException(ERROR_CODE.DB_ERROR, err.sqlMessage))
        resolve(results)
      }
    )
  })
}

const insert = (employeeNum, date, clockIn, clockOut) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO attendances (employee_num, clock_date, clock_in, clock_out) VALUES (?, ?, ?, ?)',
      [employeeNum, date, clockIn, clockOut],
      function (err, results) {
        if (err) reject(new ErrorException(ERROR_CODE.DB_ERROR, err.sqlMessage))
        resolve(results)
      }
    )
  })
}

const updateClockIn = (employeeNum, date, clockIn) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE attendances 
        SET clock_in = ?
        WHERE employee_num = ? AND clock_date = ?`,
      [clockIn, employeeNum, date],
      function (err, results) {
        if (err) reject(new ErrorException(ERROR_CODE.DB_ERROR, err.sqlMessage))
        resolve(results)
      }
    )
  })
}

const updateClockOut = (employeeNum, date, clockOut) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE attendances 
        SET clock_out = ?
        WHERE employee_num = ? AND clock_date = ?`,
      [clockOut, employeeNum, date],
      function (err, results) {
        if (err) reject(new ErrorException(ERROR_CODE.DB_ERROR, err.sqlMessage))
        resolve(results)
      }
    )
  })
}

module.exports = {
  getByDate,
  getByEmployeeAndDate,
  insert,
  updateClockOut,
  updateClockIn,
}

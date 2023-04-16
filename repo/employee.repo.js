const {db} = require('../config/mysql')
const {ErrorException} = require('../errorHandler/errorException')
const {ERROR_CODE} = require('../errorHandler/errorCode')

const getByClockDate = (date) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT e.employee_num
      FROM employees e
      INNER JOIN attendances a ON a.employee_num = e.employee_num
      WHERE a.clock_date = ?`,
      [date],
      function (err, results) {
        if (err) reject(new ErrorException(ERROR_CODE.DB_ERROR, err.sqlMessage))
        resolve(results)
      }
    )
  })
}

const getByClockDateAndEarliestClockIn = (date, limit) => {
  let sql = `SELECT e.employee_num
      FROM employees e
      INNER JOIN attendances a ON a.employee_num = e.employee_num
      WHERE a.clock_date = ? AND a.clock_in IS NOT null
      ORDER BY a.clock_in`

  if (limit != null) sql += ' LIMIT ?'

  return new Promise((resolve, reject) => {
    db.query(sql, [date, limit], function (err, results) {
      if (err) reject(new ErrorException(ERROR_CODE.DB_ERROR, err.sqlMessage))
      resolve(results)
    })
  })
}

const getByClockDateRangeAndNoClockout = (from, to) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT e.employee_num
      FROM employees e
      INNER JOIN attendances a ON a.employee_num = e.employee_num
      WHERE a.clock_date >= ? AND a.clock_date <= ? AND a.clock_out IS null`,
      [from, to],
      function (err, results) {
        if (err) reject(new ErrorException(ERROR_CODE.DB_ERROR, err.sqlMessage))
        resolve(results)
      })
  })
}

module.exports = {
  getByClockDate,
  getByClockDateAndEarliestClockIn,
  getByClockDateRangeAndNoClockout
}

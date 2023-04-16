const {db} = require('../config/mysql')
const {ErrorException} = require('../errorHandler/errorException')
const {ERROR_CODE} = require('../errorHandler/errorCode')

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

module.exports = {
  getByDate
}

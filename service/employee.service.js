const repo = require('../repo/employee.repo')

const getEmployeesByClockDate = (date) => {
  console.log(`Query employees clockin-ed on ${date}`)
  return repo.getByClockDate(date)
}

const getEmployeesWithEarliestClockInByDate = (date, limit) => {
  console.log(`Query employees clockin-ed on ${date} and top ${limit} earliest`)
  return repo.getByClockDateAndEarliestClockIn(date, limit)
}

const getEmployeesByClockDateRangeAndNoClockOut = (from, to) => {
  console.log(`Query employees clockin-ed between ${from}-${to} without clock out`)
  return repo.getByClockDateRangeAndNoClockout(from, to)
}

module.exports = {
  getEmployeesByClockDate,
  getEmployeesWithEarliestClockInByDate,
  getEmployeesByClockDateRangeAndNoClockOut
}

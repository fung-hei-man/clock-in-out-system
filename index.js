require('dotenv').config()
const fs = require('fs')
const { db } = require('./config/mysql')
const { app } = require('./config/express')

const createTablesIfNotExist = (connection) => {
  console.log('=== CREATE TABLES ===')
  const sqlArray = fs.readFileSync('./sql/database.sql').toString().trim().split(';')

  for (let sqlStatement of sqlArray) {
    sqlStatement = sqlStatement.trim()
    if (sqlStatement === '') break

    connection.query(`${sqlStatement};`, (err) => {
      if (err) console.error(`Error when creating table: ${err}`)
    })
  }
}

const insertDefaultDataIfNotExist = (connection) => {
  let filePath = process.env.DEFAULT_FILE_PATH
  if (filePath === '') {
    console.log('=== NO DEFAULT DATA TO INSERT, PASS ===')
    return
  }

  console.log(`=== INSERT DEFAULT DATA (${filePath}) ===`)

  const dataFile = fs.readFileSync('./data/member.json').toString().replaceAll('clockIn ', 'clockIn')
  const clockInRecords = JSON.parse(dataFile)
  let attendanceRecords = []
  let employeeRecords = []

  for (const record of clockInRecords) {
    let employeeNum = record['employeeNumber']
    let date = record['clockIn'] !== null ? record['clockIn'].split(' ')[0] : record['clockOut'].split(' ')[0]
    let clockIn = record['clockIn'] === null ? null : `${record['clockIn'].split(' ')[1]}:00`
    let clockOut = record['clockOut'] === null ? null : `${record['clockOut'].split(' ')[1]}:00`

    employeeRecords.push([employeeNum])
    attendanceRecords.push([employeeNum, date, clockIn, clockOut])
  }

  connection.query('INSERT IGNORE INTO employees (employee_num) VALUES ?', [employeeRecords], (err, result) => {
    if (err) {
      console.error(`Error when inserting default employee data: ${err}`)
    } else {
      console.log(`Inserted ${result?.affectedRows} employee records`)
    }
  })

  connection.query('INSERT IGNORE INTO attendances (employee_num, clock_date, clock_in, clock_out) VALUES ?', [attendanceRecords], (err, result) => {
    if (err) {
      console.error(`Error when inserting default attendance data: ${err}`)
    } else {
      console.log(`Inserted ${result?.affectedRows} attendance records`)
    }
  })
}

const startExpressServer = () => {
  app.listen( process.env.SERVER_PORT, async () => {
    console.log(`Check-in-system is listening on port: ${ process.env.SERVER_PORT}`)
  })
}

(() => {
  db.getConnection(async (err, connection) => {
    if (err) throw err

    createTablesIfNotExist(connection)
    insertDefaultDataIfNotExist(connection)
  })

  startExpressServer()
})()

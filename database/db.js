const mysql = require('mysql2');
import fs from fs;


const db = mysql.createConnection({
  host: 'dexter.mysql.database.azure.com',
  user: 'Amodh',
  password: 'Dexter@2132',
  database: 'task_pulse',
  port:"3306",
  
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;

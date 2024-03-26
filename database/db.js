const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'database-1.cfc6wc4ekqmr.eu-north-1.rds.amazonaws.com',
  user: 'Amodh',
  password: 'Dexter2022',
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

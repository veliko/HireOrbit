
var db;
if(process.env.NODE_ENV === 'PRODUCTION'){
  db = {
    dbName: 'hireorbit',
    dbHost: 'postgres',
    dbUser: 'hireorbit'
  }
} else {
  db = {
    dbName: 'hireorbit',
    dbHost: 'localhost',
    dbUser: 'shivg'
  }
}

module.exports = db;
  // dbUser: 'hireorbit'
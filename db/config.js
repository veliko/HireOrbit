
var db;
if(process.env.NODE_ENV === 'production'){
  db = {
    dbName: 'hireorbit',
    dbHost: 'hireorbit',
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
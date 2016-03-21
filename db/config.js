

if(process.env.NODE_ENV === 'production'){
  const db = {
    dbName: 'hireorbit',
    dbHost: 'hireorbit',
    dbUser: 'hireorbit'
  }
} else {
  const db = {
    dbName: 'hireorbit',
    dbHost: 'localhost',
    dbUser: 'shivg'
  }
}

module.exports = db;
  // dbUser: 'hireorbit'
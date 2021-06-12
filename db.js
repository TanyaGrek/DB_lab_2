const Pool = require('pg').Pool;

// const connectionString = `postgresql://postgres:postgres@$5432:5432/booking`

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: '5432/tcp',
  database: 'booking',
});

module.exports = pool;
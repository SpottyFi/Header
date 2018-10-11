const { Pool } = require('pg');
const pool = new Pool({
  user: 'power_user',
  host: '35.183.114.116',
  database: 'artistinformation',
  password: 'password',
  port: 5432,
});

module.exports = pool;

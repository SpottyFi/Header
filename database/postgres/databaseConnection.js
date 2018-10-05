const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'artist_everything',
  password: 'postgres',
  port: 5432,
});

module.exports = pool;

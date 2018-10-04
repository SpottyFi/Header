const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'artist_everything',
  password: 'postgres',
  port: 5432,
});

module.exports = client;

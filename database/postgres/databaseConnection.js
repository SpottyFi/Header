const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'artist_everything',
  password: 'postgres',
  port: 5432,
});
client.connect();

client.query('SELECT * from artists where artistid = 1234233', (err, res) => {
  if (err) {
    console.log(err, ' is the the err');
  }
  console.log(res.rows[0], ' the returned result');
  client.end();
});

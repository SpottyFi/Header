const client = require('../../../database/postgres/databaseConnection.js');

client.connect();

exports.getData = (req, res) => {
  let artist = req.params.artistID;
  client.query(
    `SELECT artistname, followed, verified, biography, city, followers, imagearr \
    FROM citiesjoin \
    INNER JOIN cities ON cities.cityid = citiesjoin.cityid \
    INNER JOIN artists on citiesjoin.artistid = artists.artistid \
    INNER JOIN imagesarray ON imagesarray.artistid = artists.artistid \
    WHERE artists.artistid = ${artist};`,
    (err, resp) => {
      if (err) {
        res.status(500).send(err, ' there was an error somewhere');
      }
      res.status(201).send(resp);
    },
  );
};

exports.postData = (req, res) => {
  client.query(`INSERT INTO artists(artistname, email) VALUES($1, $2)`)
}
const pool = require('../../../database/postgres/databaseConnection.js');
const cities = require('./citySort.js');
pool.connect();

exports.getData = (req, res) => {
  let artist = req.params.artistID;
  pool.query(
    ` SELECT artistname, followed, verified, biography, imagesarr, city, followers
    FROM citiesjoin
    INNER JOIN artists ON artists.artistid = citiesjoin.artistid
    INNER JOIN cities on cities.cityid = citiesjoin.cityid
    WHERE citiesjoin.artistid = $1
    ORDER BY followers DESC;`,
    [artist],
    (err, resp) => {
      if (err) {
        res.status(500).send(err, ' this is the err');
      }
      let struck = cities.construction(resp.rows);
      res.status(201).send(struck);
    },
  );
};

let citiesInsertion = (citiesObj, artistnombre, callback) => {
  if (citiesObj) {
    for (let props in citiesObj) {
      pool.query(
        `INSERT INTO citiesjoin (artistid, cityid, followers) \
        VALUES ((SELECT artistid FROM artists WHERE artistname = $1),(SELECT (cityid) from cities WHERE city = $2) \
        ON CONFLICT (cityid) DO NOTHING RETURNING `,
        [artistnombre, props, citiesObj[props]],
        (err, resp) => {
          if (err) {
            callback.status(500).send(err);
          } else {
            callback.status(201).send(resp.rows[0]);
          }
        },
      );
    }
  }
};

exports.postData = (req, res) => {
  let artist = [req.body.artistname, false, true, req.body.biography];
  let cities = req.body.where;
  pool
    .query(
      `INSERT INTO artists(artistname, followed, verified, biography) VALUES($1, $2, $3, $4)`,
      artist,
    )
    .then(resp => {
      res.status(201).send(resp.rows[0]);
    })
    .catch(e => res.status(500).send(e));
};

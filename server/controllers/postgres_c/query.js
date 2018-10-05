const pool = require('../../../database/postgres/databaseConnection.js');
const cities = require('./citySort.js');
pool.connect();

exports.getData = (req, res) => {
  let artist = req.params.artistID;
  let artistResponse = {
    artistImages: null,
    artistName: null,
    followed: null,
    verified: null,
    followersNumber: null,
    about: {
      biography: null,
      where: null,
    },
  };
  pool.query(
    `SELECT artistname, followed, verified, biography, imagesarr \
    FROM artists \
    INNER JOIN imagesarr on imagesarr.artistid = artists.artistid \
    WHERE artists.artistid = ${artist};`,
    (err, resp) => {
      if (err) {
        res.status(500).send(err, ' there was an error somewhere');
      }
      artistResponse.artistName = resp.rows[0].artistname;
      artistResponse.artistImages = resp.rows[0].imagesarr;
      artistResponse.followed = resp.rows[0].followed;
      artistResponse.verified = resp.rows[0].verified;
      artistResponse.about.biography = resp.rows[0].biography;
      console.log(typeof resp.rows[0].imagesarr);
      pool.query(
        `SELECT city, followers \
        FROM cities \
        INNER JOIN citiesjoin on cities.cityid = citiesjoin.cityid \
        WHERE citiesjoin.artistid = ${artist}
        ORDER BY followers DESC;`,
        (err, resp) => {
          if (err) {
            res
              .status(500)
              .send(err, ' there was an error in the cities piece');
          }
          let top = cities.sorter(resp.rows);
          artistResponse.about.where = top[0];
          artistResponse.followersNumber = top[1];
          res.status(201).send(artistResponse);
        },
      );
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
      // citiesInsertion(cities, artist[0], res);
    })
    .catch(e => res.status(500).send(e));
};

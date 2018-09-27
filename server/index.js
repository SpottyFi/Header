const path = require('path');
const express = require('express');
const cors = require('cors');
require('console-stamp')(console, 'HH:MM:ss.l');

const app = express();
app.use(require('morgan')('short'));
app.use(cors());
// *************webpack-hot-middleware set-up*******************
// // Step 1: Create & configure a webpack compiler

// const webpack = require('webpack');
// const webpackConfig = require('../webpack.config');
// const compiler = webpack(webpackConfig);

// // Step 2: Attach the dev middleware to the compiler & the app
// app.use(
//   require('webpack-dev-middleware')(compiler, {
//     logLevel: 'warn',
//     publicPath: webpackConfig.output.publicPath
//   })
// );

// // Step 3: Attach the hot middleware to the compiler & the app
// app.use(
//   require('webpack-hot-middleware')(compiler, {
//     log: console.log,
//     path: '/__webpack_hmr',
//     heartbeat: 10 * 1000
//   })
// );
// SOURCE: https://github.com/webpack-contrib/webpack-hot-middleware/tree/master/example
// ************************************
const bodyParser = require('body-parser');
const HeaderDB = require('../database/index.js');
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/../public/dist'));

// Upon GET request to '/artist/:artistID', queries the HeaderDB (mongoDB) and sends back artistObj.
app.get('/artists/:artistID', (req, res) => {
  console.log('##########RECEIVING GET##########');
  if (!!parseInt(req.params.artistID)) {
    HeaderDB.find(
      { artistID: parseInt(req.params.artistID) },
      (err, artistObj) => {
        res.statusCode = 200;
        res.send(artistObj);
      },
    );
  } else {
    // conditional error handling if artistID parameter is string
    res
      .status(400)
      .send({ ERROR: 'artistID parameter accepts numbers between 1 and 100' });
  }
});

app.post('/artists/:artistID', (req, res) => {
  res.status(400).send('error on the side');
  HeaderDB.create(req.body, function(err, newData) {
    err ? res.status(500).send(err) : res.status(201).send(newData);
  });
});

app.put('/artists/:artistID', (req, res) => {
  //updates current artist information, or overwrites an existing artist
  HeaderDB.findOneAndUpdate(
    { artistID: parseInt(req.params.artistID) },
    req.body,
    (err, artist) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(' successful update');
      }
    },
  );
  res.status(400).send({ ERROR: 'does not accept put request' });
});

app.delete('/artists/:artistID', (req, res) => {
  res.status(400).send({ ERROR: 'does not accept artist deletion request' });
});

app.listen(process.env.PORT || 3004, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(
    `==> 🌎 Listening on port %s. Open up http://127.0.0.1:${process.env.PORT ||
      3004}/ in your browser.`,
  );
});

module.exports = app;

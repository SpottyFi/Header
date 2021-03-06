// const newrelic = require('newrelic');
const cluster = require('cluster');
const os = require('os');
const path = require('path');
const express = require('express');
const cors = require('cors');
const postgres = require('./controllers/postgres_c/query.js');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../public/dist'));
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

  app.get('/artists/:artistID', postgres.getCache);

  app.post('/artists/:artistID', postgres.postData);

  app.delete('/artists/:artistID', (req, res) => {
    res.status(400).send({ ERROR: 'does not accept artist deletion request' });
  });

  app.listen(process.env.PORT || 3004, function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info(
      `==> 🌎 Listening on port %s. Open up http://127.0.0.1:${process.env
        .PORT || 3004}/ in your browser.`,
    );
  });

  module.exports = app;
}
cluster.on('exit', worker => {
  console.log('mayday! mayday! worker', worker.id, ' is no more!');
  cluster.fork();
});

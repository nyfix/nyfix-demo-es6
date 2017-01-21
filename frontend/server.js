var path = require('path');
var express = require('express');
var webpack = require('webpack');
var history = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');
var cfg = require('./config')
var prod = process.env.NODE_ENV == 'production'
var config = require(prod ? './webpack.config' : './webpack.dev.config');

var app = express();
var compiler = webpack(config);

app.use(history());
app.use(proxy('/api', {target: cfg.shared.backend.path, changeOrigin: true}));

var middleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: cfg.shared.frontend.path,
  historyApiFallback: true
});
app.use(middleware);

app.use(require('webpack-hot-middleware')(compiler));

app.use('/img', express.static(__dirname + '/assets/img'));

app.get('*', (req, res) => {
  const file = middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html'));
  res.write(file);
  res.end();
});

app.listen(cfg.shared.frontend.port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://0.0.0.0:${cfg.shared.frontend.port}`);
});

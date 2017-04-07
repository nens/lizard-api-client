var webpack = require('webpack');

var libraryName = 'LizardApiClient';

var config = {
  entry: [__dirname + '/src/index.js'],
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: libraryName + '.js',
    publicPath: '/scripts/',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    // Redirect these to Lizard NXT running on port 8000,
    // for local development. Login through /admin.
    proxy: {
      '/api': 'http://127.0.0.1:8000/',
      '/admin': 'http://127.0.0.1:8000/',
      '/static': 'http://127.0.0.1:8000/',
    }
  }
};

module.exports = config;

const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');

const port = 3000;
const host = 'localhost';

module.exports = {
  port,
  host,
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules','src', 'assets'],
    extensions: ['', '.js', '.jsx'],
    alias: { soundmanager2: 'soundmanager2/script/soundmanager2-nodebug-jsmin.js' }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.svg$/,
      loader: 'raw-loader',
      include: path.join(__dirname, 'assets')
    }, {
      test: /\.scss$/,
      include: path.join(__dirname, 'assets'),
      loader: combineLoaders([{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }, {
        loader: 'sass-loader'
      }, {
        loader: 'autoprefixer-loader',
        query: {
          browsers:'last 2 versions'
        }
      }])
    }]
  }
};

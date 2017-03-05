const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');

const port = 3000;
const host = 'localhost';
const devtool = (process.env.NODE_ENV === 'production')?'source-map':'eval';
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin()
];
const entry = ['./src/index'];
if (process.env.NODE_ENV !== 'production') {
  entry.unshift('webpack/hot/only-dev-server');
  entry.unshift(`webpack-dev-server/client?http://${host}:${port}`);
  entry.unshift('react-hot-loader/patch');
  plugins.splice(0, 2, new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  port,
  host,
  entry,
  plugins,
  devtool,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    modulesDirectories: ['node_modules','src', 'assets'],
    extensions: ['', '.js', '.jsx'],
    alias: { 
      'soundmanager2': 'soundmanager2/script/soundmanager2-nodebug-jsmin.js'
    }
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

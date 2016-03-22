var path = require('path');
var webpack = require('webpack');
var production = process.env.NODE_ENV === 'PRODUCTION';
var CleanPlugin = require('clean-webpack-plugin');

var outputPath = __dirname + '/client';
var plugins = [];

if (production) {
    plugins = [
      new CleanPlugin('builds'),
      
      new webpack.optimize.DedupePlugin(),

     
      new webpack.optimize.OccurenceOrderPlugin(),

      new webpack.NoErrorsPlugin(),
   
      new webpack.optimize.MinChunkSizePlugin({
          minChunkSize: 51200, // ~50kb
      }),

      new webpack.optimize.UglifyJsPlugin({
          mangle:   true,
          compress: {
              warnings: false, // Suppress uglification warnings
          },
      }),

      new webpack.optimize.AggressiveMergingPlugin(),


      // This plugins defines various variables that we can set to false
      // in production to avoid code related to them from being compiled
      // in our final bundle
      new webpack.DefinePlugin({
          __SERVER__:      !production,
          __DEVELOPMENT__: !production,
          __DEVTOOLS__:    !production,
          'process.env':   {
              BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
              NODE_ENV: JSON.stringify('production')
          },
      })

    ];
}

module.exports = {
  entry: './client/init.js',
  output: { path: outputPath, filename: 'bundle.js' },
  // plugin: plugins,
  devtool: 'cheap-module-source-map',
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [/node_modules/, /typings/, /bower_components/],
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },

};


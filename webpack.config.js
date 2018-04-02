const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    entry: './lab_extension.js'
  },
  output: {
    libraryTarget: 'amd',
    path: path.resolve(__dirname, 'lib/'),
    publicPath: 'lib/',
    filename: 'lab_extension.js'
  },
  devtool: 'eval-source-map',
  module: {
    // Apply `noParse` to Tangram to prevent mangling of UMD boilerplate
    noParse: /tangram\/dist\/tangram/,
    rules: [{
      test: /\.js?$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          "presets": [
            "latest"
          ],
          "plugins": [
            "transform-class-properties"
          ]
        }
      }]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      // This is required to bundle images in Leaflet's stylesheet.
      test: /\.png$/,
      use: 'url-loader'
    }]
  },

};
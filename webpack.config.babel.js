import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

// constraction
const DEBUG = process.argv.includes('--development');

export default {
  entry: './src/app/app.jsx',

  output: {
    path: './public/js',
    filename: 'app.js'
  },

  resolve: {
    extensions: ['', '.js', 'jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel'
      },{
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ]
  },

  postcss: [autoprefixer],

  devtool: DEBUG ? 'inline-source-map' : false,

  plugins: (DEBUG ? [] : [
    new webpack.optimize.UglifyJsPlugin()
  ])
}
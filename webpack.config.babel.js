import webpack from 'webpack';

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
      },{
        test: /\.html$/,
        loader: 'html'
      }
    ]
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-custom-media')({
      extensions: {
        '--phone': '(min-width: 375px)',
        '--desktop': '(min-width: 1080px)'
      }
    })
  ],

  devtool: DEBUG ? 'inline-source-map' : false,

  plugins: (DEBUG ? [] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ])
}
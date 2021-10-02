const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public/bundle'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          }
      ]
  }
};
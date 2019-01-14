const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /(\.css|\.less)$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader",
            options: {
              modules: false,
              url: false,
              minimize: true
            }
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loaders: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html')
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  target: 'electron-renderer'
};

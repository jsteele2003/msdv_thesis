
module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/app/index.jsx",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  devServer: {
    contentBase: "./public",
    port: 3000,
    historyApiFallback: true,
    inline: true
  }
}
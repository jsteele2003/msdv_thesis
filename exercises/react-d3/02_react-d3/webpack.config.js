
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
    port: process.env.PORT,
    host: process.env.IP,
    // public: 'msdv-thesis-jlsteele.c9users.io/',
    historyApiFallback: true,
    inline: true
  }
}
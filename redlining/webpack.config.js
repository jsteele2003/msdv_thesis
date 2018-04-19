const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
      rules: [
          {
              // Compile ES2015 using buble
              test: /\.js$/,
              loader: 'buble-loader',
              include: [resolve('.')],
              exclude: [/node_modules/],
              options: {
                  objectAssign: 'Object.assign'
              }
          },
          {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, "css-loader"]
          }
      ]
  },

    resolve: {
        alias: {
            // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
            'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object")
        })
    ]
};
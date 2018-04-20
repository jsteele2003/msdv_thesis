const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');


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
            'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new Dotenv({
            path: './.env',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ]
};
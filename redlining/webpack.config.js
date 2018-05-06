const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')



module.exports = {
  module: {
      rules: [
          {
              // Compile ES2015 using buble
              test: /\.js$/,
              loader: 'babel-loader',
              include: [resolve('.')],
              exclude: [/node_modules/]
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
        // new UglifyJsPlugin(),
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         NODE_ENV: JSON.stringify("production")
        //     }
        // })
    ]
};
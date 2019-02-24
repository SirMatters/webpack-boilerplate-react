const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";

  return {
    entry: { main: './src/index.js'},
    output : {
      path: path.resolve(__dirname, 'dist'),
      filename: "[name].[hash].js"
    }, 
    devServer: {
      contentBase: './dist',
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            "style-loader",
            // MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  require("autoprefixer")(),
                  require("cssnano")()
                ]
              }
            },
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin("dist", {}),
      new MiniCssExtractPlugin({
        filename: "style.[contenthash].css"
      }),
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: "./src/index.html",
        filename: "index.html"
      })
    ]
  };
}
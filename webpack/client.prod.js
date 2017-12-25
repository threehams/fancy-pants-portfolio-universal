const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  name: "client",
  target: "web",
  devtool: "source-map",
  entry: [path.resolve(__dirname, "../src/index.js")],
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "..", "build", "client"),
    publicPath: "/static/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                camelCase: true,
                localIdentName: "[hash:base64:5]",
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
      "preact-compat": "preact-compat/dist/preact-compat",
    },
    extensions: [".js", ".css"],
  },
  plugins: [
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      deepChildren: true,
      names: ["manifest", "main"], // needed to put webpack bootstrap code before chunks
      filename: "[name].[chunkhash].js",
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new UglifyJSPlugin(),
  ],
};

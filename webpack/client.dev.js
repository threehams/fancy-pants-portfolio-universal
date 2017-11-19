const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  name: "client",
  target: "web",
  devtool: "eval",
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false",
    "react-hot-loader/patch",
    path.resolve(__dirname, "../src/index.js"),
  ],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
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
                localIdentName: "[name]__[local]--[hash:base64:5]",
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
      names: ["manifest"], // needed to put webpack bootstrap code before chunks
      filename: "[name].js",
      minChunks: Infinity,
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};

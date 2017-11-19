const path = require("path");
const webpack = require("webpack");

const res = p => path.resolve(__dirname, p);

const entry = res("../server/render.js");
const output = res("../build/server");

module.exports = {
  name: "server",
  target: "node",
  devtool: "source-map",
  entry: [entry],
  output: {
    path: output,
    filename: "[name].js",
    libraryTarget: "commonjs2",
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
        exclude: /node_modules/,
        use: [
          {
            loader: "css-loader/locals",
            options: {
              modules: true,
              camelCase: true,
              localIdentName: "[hash:base64:5]",
            },
          },
        ],
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};

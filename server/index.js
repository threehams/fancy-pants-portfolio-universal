require("colors");
const express = require("express");
const webpack = require("webpack");
const noFavicon = require("express-no-favicons");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const clientConfig = require("../webpack/client.dev");
const serverConfig = require("../webpack/server.dev");
const clientConfigProd = require("../webpack/client.prod");
const serverConfigProd = require("../webpack/server.prod");
const fs = require("fs");
const path = require("path");

const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const DEV = process.env.NODE_ENV === "development";
const BUILD = process.env.BUILD;
const app = express();
app.use(noFavicon());

let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log("BUILD COMPLETE -- Listening @ http://localhost:3000".magenta);
  });

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const options = { publicPath, stats: { colors: true } };

  console.log(path.resolve(__dirname, "..", "assets"));
  app.use("/assets/", express.static(path.resolve(__dirname, "..", "assets")));
  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));

  compiler.plugin("done", done);
} else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    if (BUILD) {
      // prettier-ignore
      fs.writeFileSync(
        path.resolve(outputPath, "webpack-stats.json"),
        JSON.stringify(stats.toJson().children[0])
      );
      return;
    }
    const clientStats = stats.toJson().children[0];
    const serverRender = require("../build/server/main.js").default;

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({ clientStats }));

    done();
  });
}

import React from "react";
import ReactDOM from "react-dom/server";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";
import database from "../src/database";

import App from "../src/components/App";

export default ({ clientStats }) => (req, res) => {
  flushChunkNames();
  const app = ReactDOM.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App database={database} />
    </StaticRouter>,
  );
  const chunkNames = flushChunkNames();
  const helmet = Helmet.renderStatic();

  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames,
    before: ["manifest"],
  });

  res.send(
    `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${styles}
        ${helmet.title}
        ${helmet.meta}
        ${helmet.link}
      </head>
      <body>
        <div id="root">${app}</div>
        ${cssHash}
        ${js}
        <script type="text/javascript">
          window.__DATABASE__ = ${JSON.stringify(database)};
        </script>
      </body>
    </html>`,
  );
};

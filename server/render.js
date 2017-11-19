import React from "react";
import renderToString from "preact-render-to-string";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";

import database from "../src/database";
const WIDTHS = [512, 752, 1008, 1504, 2000, 2500];
const ASSET_HOST = process.env.ASSET_HOST || "/assets";

const store = {
  ...database,
  pictures: database.pictures.map(({ filename, ...rest }) => {
    return {
      ...rest,
      defaultUrl: `${ASSET_HOST}/${filename}.1504w.jpg`,
      images: WIDTHS.map(width => {
        return {
          url: `${ASSET_HOST}/${filename}.${width}w.jpg`,
          width,
        };
      }),
      thumbUrl: `${ASSET_HOST}/${filename}.thumb.jpg`,
    };
  }),
};

import App from "../src/components/App";

export default ({ clientStats }) => (req, res) => {
  flushChunkNames();
  const app = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App database={store} />
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
          window.__DATABASE__ = ${JSON.stringify(store)};
        </script>
      </body>
    </html>`,
  );
};

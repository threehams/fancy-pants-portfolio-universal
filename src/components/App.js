import React, { Component } from "react";
import universal from "react-universal-component";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";

import "../css/App.css";

const PictureDetail = universal(import("./PictureDetail"), {
  minDelay: 500,
});
const PictureList = universal(import("./PictureList"), {
  minDelay: 500,
});

export default class App extends Component {
  componentWillMount() {
    PictureDetail.preload();
    PictureList.preload();
  }

  render() {
    const { database } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <PictureList
              banner={database.banner}
              pictures={database.pictures}
            />
          )}
        />
        <Route
          exact
          path="/:slug"
          render={({ match }) => {
            const picture = database.pictures.find(
              picture => picture.slug === match.params.slug,
            );
            if (picture) {
              return <PictureDetail picture={picture} />;
            }
            return <NotFound />;
          }}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

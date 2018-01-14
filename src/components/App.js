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
            const pictureIndex = database.pictures.findIndex(
              picture => picture.slug === match.params.slug,
            );
            if (pictureIndex !== -1) {
              const picture = database.pictures[pictureIndex];
              const prev =
                database.pictures[pictureIndex - 1] &&
                database.pictures[pictureIndex - 1].slug;
              const next =
                database.pictures[pictureIndex + 1] &&
                database.pictures[pictureIndex + 1].slug;
              return (
                <PictureDetail picture={picture} prev={prev} next={next} />
              );
            }
            return <NotFound />;
          }}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

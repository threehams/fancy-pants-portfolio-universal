import React from "react";
import universal from "react-universal-component";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";

import "../css/App.css";

const UniversalComponent = universal(props => import(`./${props.page}`), {
  minDelay: 200,
});

const App = ({ database }) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <UniversalComponent
            page="PictureList"
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
            return (
              <UniversalComponent page="PictureDetail" picture={picture} />
            );
          }
          return <NotFound />;
        }}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;

import React from "react";
import Helmet from "react-helmet";

const PictureDetail = ({ picture }) => {
  return (
    <div>
      <Helmet>
        <title>Vanessa M. Zuloaga | {picture.title}</title>
        <meta
          name="description"
          content={`${picture.title} by Vanessa M. Zuloaga. Artist, illustrator, designer located in Los Angeles, CA.`}
        />
      </Helmet>
      <img src={picture.url} />
    </div>
  );
};

export default PictureDetail;

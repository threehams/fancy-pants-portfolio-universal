import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import Img from "./Img";
import styles from "../css/PictureList.css";

const PictureList = ({ banner, pictures }) => {
  return (
    <div>
      <Helmet>
        <title>Vanessa M. Zuloaga | Portfolio</title>
        <meta
          name="description"
          content="Portfolio for Vanessa M. Zuloaga. Artist, illustrator, designer located in Los Angeles, CA."
        />
      </Helmet>

      <div className={styles.tileList}>
        {pictures.map(picture => (
          <Link
            key={picture.id}
            to={`/${picture.slug}`}
            className={styles.tile}
          >
            <Img
              className={styles.tileImage}
              width={picture.width}
              height={picture.height}
              src={picture.images[0].url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PictureList;

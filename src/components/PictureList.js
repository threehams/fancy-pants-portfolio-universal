import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import styles from "../css/PictureList.css";

const PictureList = ({ banner, pictures }) => {
  return (
    <div>
      <Helmet>
        <title>Vanessa M. Zuloaga | Portfolio</title>
      </Helmet>

      <div className={styles.tileList}>
        {pictures.map(picture => (
          <Link
            key={picture.id}
            to={`/${picture.slug}`}
            className={styles.tile}
          >
            <img src={picture.url} />
            <div
              className={styles.tileFooter}
              style={{
                backgroundColor: picture.backgroundColor,
                color: textColor(picture.backgroundColor),
              }}
            >
              {picture.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const textColor = backgroundColor => {
  const r = parseInt(backgroundColor.slice(1, 3), 16);
  const g = parseInt(backgroundColor.slice(3, 5), 16);
  const b = parseInt(backgroundColor.slice(5, 7), 16);

  if ((r * 299 + g * 587 + b * 114) / 1000 < 125) {
    return "white";
  }
  return "black";
};

export default PictureList;

import React from "react";
import Helmet from "react-helmet";
import { format, parse } from "date-fns";
import { Link } from "react-router-dom";

import styles from "../css/PictureDetail.css";

const PictureDetail = ({ picture, next, prev }) => {
  const aspectRatio = picture.height / picture.width;
  const height = `${100 * aspectRatio}vh`;
  const maxHeight = "90vh";

  return (
    <div className={styles.background}>
      <Helmet>
        <title>Vanessa M. Zuloaga | {picture.title}</title>
        <meta
          name="description"
          content={`${
            picture.title
          } by Vanessa M. Zuloaga. Artist, illustrator, designer located in Los Angeles, CA.`}
        />
      </Helmet>
      <div
        className={styles.mainImage}
        style={{ height, maxHeight, objectFit: "contain" }}
      >
        <img
          className={styles.image}
          src={picture.defaultUrl}
          srcSet={picture.images
            .map(image => {
              return `${image.url} ${image.width}w`;
            })
            .join(", ")}
          alt={picture.title}
        />
      </div>
      <Link to="/" className={styles.close}>
        <div className={styles.closeIcon} />
      </Link>
      {prev && (
        <Link to={prev} className={styles.arrowLeft}>
          <div className={styles.angleLeft} />
        </Link>
      )}
      {next && (
        <Link to={next} className={styles.arrowRight}>
          <div className={styles.angleRight} />
        </Link>
      )}
      <div className={styles.container}>
        <div className={styles.wrappable}>
          <h1 className={styles.title}>{picture.title}</h1>
          <p className={styles.completionDate}>
            Completed: {format(parse(picture.completionDate), "MM/DD/YYYY")}
          </p>
          <p className={styles.description}>{picture.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PictureDetail;

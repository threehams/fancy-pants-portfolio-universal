import React from "react";
import Helmet from "react-helmet";

import styles from "../css/PictureDetail.css";

const PictureDetail = ({ picture }) => {
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
      <div className={styles.container}>
        <div className={styles.wrappable}>
          <h1 className={styles.title}>{picture.title}</h1>
          <p className={styles.completionDate}>
            Completed: {new Date(picture.completionDate)}
          </p>
          <p className={styles.description}>{picture.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PictureDetail;

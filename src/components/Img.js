import React from "react";
import styles from "../css/Img";

const Img = ({ alt, src, width, height }) => {
  const aspectRatio = height / width * 100;
  return (
    <div
      className={styles.container}
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      <img className={styles.image} src={src} alt={alt} />
    </div>
  );
};

export default Img;

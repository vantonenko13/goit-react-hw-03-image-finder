import React from "react";
import PropTypes from "prop-types";

import styles from "./ImageGallery.module.scss";

const ImageGalleryItem = ({ previewImgUrl, largeImgUrl, openPhoto }) => {
  return (
    <li className={styles.GalleryItem} onClick={() => openPhoto(largeImgUrl)}>
      <img src={previewImgUrl} alt="images" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  previewImgUrl: PropTypes.string,
  largeImgUrl: PropTypes.string,
  openPhoto: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

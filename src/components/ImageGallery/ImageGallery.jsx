import React from "react";
import PropTypes from "prop-types";

import ImageGalleryItem from "./ImageGalleryItem";

import styles from "./ImageGallery.module.scss";

const ImageGallery = ({ images, message, openPhoto }) => {
  return (
    <div className={styles.Gallery}>
      {message && <p className={styles.Message}>{message}</p>}
      {images.length !== 0 && (
        <ul className={styles.GalleryList}>
          {images.map((image, i) => {
            const { id, webformatURL, largeImageURL } = image;
            return (
              <ImageGalleryItem
                key={`${i}-${id}`}
                previewImgUrl={webformatURL}
                largeImgUrl={largeImageURL}
                openPhoto={openPhoto}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  message: PropTypes.string,
  openPhoto: PropTypes.func.isRequired,
};

export default ImageGallery;

import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./ImageGallery.module.scss";

class ImageGalleryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { previewImgUrl, largeImgUrl, openPhoto } = this.props;

    return (
      <li className={styles.GalleryItem} onClick={() => openPhoto(largeImgUrl)}>
        <img src={previewImgUrl} alt="images" />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  previewImgUrl: PropTypes.string,
  largeImgUrl: PropTypes.string,
  openPhoto: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

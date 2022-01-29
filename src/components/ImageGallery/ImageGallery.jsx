import React, { Component } from "react";
import PropTypes from "prop-types";

import * as API from "../../services/api/axios";
import ImageGalleryItem from "./ImageGalleryItem";
import Button from "../../components/Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

import styles from "./ImageGallery.module.scss";

class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      page: 1,
      panding: false,
      showModal: false,
      activeImgUrl: "",
    };
  }

  params = () => {
    return {
      q: this.props.searchParam,
      page: this.state.page,
      key: "25464957-7fb897a11bdcf9525975f1940",
      image_type: "photo",
      orientation: "horizontal",
      per_page: 12,
    };
  };

  componentDidUpdate(prevProps, prevState) {
    const searchChanged =
      prevProps.searchParam.toLowerCase() !== this.props.searchParam.toLowerCase();

    const pageChanged = prevState.page !== this.state.page;

    if (searchChanged || pageChanged) {
      this.setState((state) => ({ pending: true, page: searchChanged ? 1 : state.page }));

      const params = this.params();

      API.getImages(params)
        .then(({ data }) => {
          this.setState((state) => ({
            pending: false,
            images: searchChanged ? [...data.hits] : [...state.images, ...data.hits],
          }));
        })
        .catch((error) => {
          console.log(error);
          this.setState({ pending: false });
        });
    }
  }

  onLoadHandler = () => {
    this.setState((state) => ({ page: state.page + 1 }));
  };

  openModal = (imageUrl) => {
    this.setState({ showModal: true, activeImgUrl: imageUrl });
  };
  closeModal = () => {
    this.setState({ showModal: false, activeImgUrl: "" });
  };

  render() {
    const { images, pending, showModal, activeImgUrl } = this.state;

    return (
      <div>
        <ul className={styles.Gallery}>
          {images.length !== 0 &&
            images.map((image, i) => {
              const { id, webformatURL, largeImageURL } = image;
              return (
                <ImageGalleryItem
                  key={`${i}-${id}`}
                  previewImgUrl={webformatURL}
                  largeImgUrl={largeImageURL}
                  openPhoto={this.openModal}
                />
              );
            })}
        </ul>
        {pending && <Loader />}
        {images.length !== 0 && <Button onLoadHandler={this.onLoadHandler} />}
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={activeImgUrl} alt={this.props.searchParam} />
          </Modal>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = { searchParam: PropTypes.string };

export default ImageGallery;

import React, { Component } from "react";

import * as API from "./services/api/axios";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

import styles from "./App.module.scss";

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: "",
      images: [],
      page: 1,
      pending: false,
      showModal: false,
      activeImgUrl: "",
      message: "",
    };
  }

  params = () => {
    return {
      q: this.state.searchValue,
      page: this.state.page,
      key: "25464957-7fb897a11bdcf9525975f1940",
      image_type: "photo",
      orientation: "horizontal",
      per_page: 12,
    };
  };

  componentDidUpdate(prevProps, prevState) {
    const searchChanged =
      prevState.searchValue.toLowerCase() !== this.state.searchValue.toLowerCase();

    const pageChanged = prevState.page !== this.state.page;

    if (searchChanged || pageChanged) {
      this.setState((state) => ({ pending: true, page: searchChanged ? 1 : state.page }));

      const params = this.params();

      API.getImages(params)
        .then(({ data }) => {
          if (data?.hits?.length !== 0) {
            this.setState((state) => ({
              pending: false,
              images: searchChanged ? [...data.hits] : [...state.images, ...data.hits],
              message: "",
            }));
          } else {
            this.setState({ pending: false, message: "Nothing found for your request!" });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ pending: false, message: error.message });
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

  searchValueHandler = (value) => {
    this.setState((state) => ({ ...state, searchValue: value }));
  };

  render() {
    const { images, pending, showModal, activeImgUrl, message } = this.state;

    return (
      <div className={styles.App}>
        <SearchBar searchHandler={this.searchValueHandler} />
        <ImageGallery images={images} message={message} openPhoto={this.openModal} />

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

export default App;

import React, { Component } from "react";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

import styles from "./App.module.scss";

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: "",
    };
  }

  searchValueHandler = (value) => {
    this.setState({ searchValue: value });
  };

  render() {
    return (
      <div className={styles.App}>
        <SearchBar searchHandler={this.searchValueHandler} />
        <ImageGallery searchParam={this.state.searchValue} />
      </div>
    );
  }
}

export default App;

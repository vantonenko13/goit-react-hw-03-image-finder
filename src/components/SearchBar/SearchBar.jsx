import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./SearchBar.module.scss";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  componentDidMount() {
    document.addEventListener("keypress", this.onKeyPressHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.onKeyPressHandler);
  }

  onChangeHandler = (e) => {
    this.setState({ value: e.target.value });
  };

  onKeyPressHandler = (e) => {
    if (e.keyCode === 13) {
      this.props.searchHandler(this.state.value);
    }
  };

  render() {
    const { value } = this.state;
    const { searchHandler } = this.props;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.Form} onSubmit={(e) => e.preventDefault()}>
          <button
            type="button"
            className={styles.Button}
            onClick={() => searchHandler(value)}
            onKeyPress={this.onKeyPressHandler}
          >
            <span className={styles.ButtonLabel}>Search</span>
          </button>

          <input
            className={styles.Input}
            type="text"
            value={value}
            onChange={this.onChangeHandler}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = { searchHandler: PropTypes.func.isRequired };

export default SearchBar;

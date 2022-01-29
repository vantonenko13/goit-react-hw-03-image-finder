import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.scss";

class Button extends Component {
  render() {
    const { onLoadHandler } = this.props;

    return (
      <div className={styles.ButtonWrapper}>
        <button type="button" className={styles.Button} onClick={onLoadHandler}>
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = { onLoadHandler: PropTypes.func.isRequired };

export default Button;

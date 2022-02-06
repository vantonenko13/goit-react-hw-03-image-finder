import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import styles from "./Modal.module.scss";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.keyDownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyDownHandler);
  }

  keyDownHandler = (e) => {
    if (e.code === "Escape") {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <div className={styles.ModalBackdrop} onClick={this.props.closeModal}>
        <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;

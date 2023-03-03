import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

const modalRootRef = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { children } = this.props;
    const { closeModal } = this;
    return createPortal(
      <div onClick={closeModal} className={styles.overlay}>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalRootRef
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

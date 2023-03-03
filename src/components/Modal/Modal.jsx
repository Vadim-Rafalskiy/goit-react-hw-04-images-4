import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({ children, close }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

  return createPortal(
    <div onClick={closeModal} className={styles.overlay}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRootRef
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

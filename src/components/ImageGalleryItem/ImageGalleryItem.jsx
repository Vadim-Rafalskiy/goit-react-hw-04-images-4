import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, showImage }) => {
  return (
    <li
      onClick={() => {
        showImage(largeImageURL);
      }}
      className={styles.imageGalleryItem}
    >
      <img
        className={styles.galleryImage}
        src={webformatURL}
        alt={tags}
        title=""
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
};

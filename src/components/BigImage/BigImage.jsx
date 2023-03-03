import PropTypes from 'prop-types';

const BigImage = ({ largeImageURL }) => {
  return <img src={largeImageURL} alt="" />;
};

export default BigImage;

BigImage.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};

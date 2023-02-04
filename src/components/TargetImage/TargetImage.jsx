import PropTypes from 'prop-types';
const TargetImage = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

TargetImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default TargetImage;

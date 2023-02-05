import { memo } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './image-gallery.module.css';

const ImageGallery = ({ items }) => {
  const elements = items.map(({ id, webformatURL, tags, largeImageURL }) => (
    <ImageGalleryItem
      key={id}
      imgLink={webformatURL}
      imgAlt={tags}
      modalImgLink={largeImageURL}
    />
  ));
  return <ul className={css.gallery}>{elements}</ul>;
};

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

export default memo(ImageGallery);

import PropTypes from 'prop-types';
import css from './gallery-item.module.css';

const ImageGalleryItem = ({ imgLink, imgAlt, openModal, modalImgLink }) => {
  return (
    <li onClick={() => openModal(modalImgLink, imgAlt)} className={css.item}>
      <img className={css.image} src={imgLink} alt={imgAlt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imgAlt: PropTypes.string.isRequired,
  imgLink: PropTypes.string.isRequired,
  modalImgLink: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

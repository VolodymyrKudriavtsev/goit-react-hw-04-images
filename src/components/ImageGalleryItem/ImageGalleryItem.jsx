import { useState, memo } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import TargetImage from 'components/TargetImage';

import css from './gallery-item.module.css';

const ImageGalleryItem = ({ imgLink, imgAlt, modalImgLink }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li onClick={() => setShowModal(true)} className={css.item}>
        <img className={css.image} src={imgLink} alt={imgAlt} />
      </li>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TargetImage src={modalImgLink} alt={imgAlt} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  imgAlt: PropTypes.string.isRequired,
  imgLink: PropTypes.string.isRequired,
  modalImgLink: PropTypes.string.isRequired,
};

export default memo(ImageGalleryItem);

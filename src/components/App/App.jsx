import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Searchbar from '../Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import TargetImage from 'components/TargetImage';

import { searchImage } from '../../services/image-api';

import css from './app.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [targetImage, setTargetImage] = useState(null);
  const [totalHits, setTotalHits] = useState('');

  const onFormSubmit = search => {
    if (search === query) return;
    setQuery(search);
    setPage(1);
    setItems([]);
    setError(null);
  };

  useEffect(() => {
    if (query) {
      const fetchImage = async () => {
        try {
          setLoading(true);
          const { hits, totalHits } = await searchImage(query, page);
          if (!hits.length) {
            return Notify.info(
              'Sorry, there are no images matching your search query. Please try again.',
              { position: 'center-center', fontSize: '17px' }
            );
          }
          setItems(prevItems => [...prevItems, ...hits]);
          setTotalHits(totalHits);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchImage();
    }
  }, [page, query]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showTargetImage = (src, alt) => {
    setShowModal(true);
    setTargetImage({
      src,
      alt,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setTargetImage(null);
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={onFormSubmit} />

      {error && <p className={css.error}>{error.message}</p>}

      {Boolean(items.length) && (
        <ImageGallery items={items} openModal={showTargetImage} />
      )}

      {loading && <Loader />}

      {Boolean(items.length) && !loading && page < totalHits / 12 && (
        <Button onClick={loadMore} />
      )}

      {showModal && (
        <Modal onClose={closeModal}>
          <TargetImage {...targetImage} />
        </Modal>
      )}
    </div>
  );
};

export default App;

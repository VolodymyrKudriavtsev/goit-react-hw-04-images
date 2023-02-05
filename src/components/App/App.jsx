import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Searchbar from '../Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import TargetImage from 'components/TargetImage';

import { searchImage } from '../../services/image-api';

import css from './app.module.css';

class App extends Component {
  state = {
    search: '',
    page: 1,
    items: [],
    loading: false,
    error: null,
    showModal: false,
    targetImage: null,
    totalHits: 0,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImage();
    }
  }

  onFormSubmit = search => {
    if (search === this.state.search) return;
    this.setState({ search, page: 1, items: [], error: null });
  };

  async fetchImage() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const { hits, totalHits } = await searchImage(search, page);
      if (!hits.length) {
        return Notify.info(
          'Sorry, there are no images matching your search query. Please try again.',
          { position: 'center-center', fontSize: '17px' }
        );
      }
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        totalHits,
      }));
    } catch (error) {
      this.setState({ error: error });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      // targetImage: null,
    });
  };

  showTargetImage = (src, alt) => {
    this.setState({
      showModal: true,
      targetImage: {
        src,
        alt,
      },
    });
  };

  render() {
    const { onFormSubmit, loadMore, closeModal, showTargetImage } = this;
    const { error, items, loading, showModal, targetImage, totalHits, page } =
      this.state;

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
  }
}

export default App;

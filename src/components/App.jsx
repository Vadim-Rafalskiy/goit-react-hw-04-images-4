import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import BigImage from './BigImage/BigImage';

import { searchImage } from 'shared/services/image-api';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    bigImage: null,
  };

  searchImage = ({ searchQuery }) => {
    this.setState({ search: searchQuery, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImage();
    }
  }

  async fetchImage() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const { hits } = await searchImage(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  showImage = largeImageURL => {
    this.setState({
      showModal: true,
      bigImage: {
        largeImageURL,
      },
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      bigImage: null,
    });
  };

  render() {
    const { items, loading, error, showModal, bigImage } = this.state;
    const { searchImage, loadMore, showImage, closeModal } = this;
    return (
      <>
        <Searchbar onSubmit={searchImage} />
        <ImageGallery items={items} showImage={showImage} />
        {error && <p>ERROR</p>}
        {loading && <Loader />}
        {Boolean(items.length) && !loading && <Button loadMore={loadMore} />}
        {showModal && (
          <Modal close={closeModal}>
            <BigImage {...bigImage} />
          </Modal>
        )}
      </>
    );
  }
}

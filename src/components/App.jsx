import { useEffect, useState } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import BigImage from './BigImage/BigImage';

import { searchImage } from 'shared/services/image-api';

export const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImage = async () => {
        try {
          setLoading(true);
          const { hits } = await searchImage(search, page);
          setItems(prevItems => [...prevItems, ...hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchImage();
    }
  }, [search, page]);

  const searchQuery = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showImage = largeImageURL => {
    setShowModal(true);
    setBigImage(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setBigImage(null);
  };

  return (
    <>
      <Searchbar onSubmit={searchQuery} />
      <ImageGallery items={items} showImage={showImage} />
      {error && <p>ERROR</p>}
      {loading && <Loader />}
      {Boolean(items.length) && !loading && <Button loadMore={loadMore} />}
      {showModal && (
        <Modal close={closeModal}>
          <BigImage largeImageURL={bigImage} />
        </Modal>
      )}
    </>
  );
};

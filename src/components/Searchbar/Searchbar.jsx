import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.scss';

import initialState from 'components/initialState';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ [name]: value });
  };

  const handleSabmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  const { search } = state;
  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSabmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>
            <img src="./images/serch.png" alt="Логотип сайту" />
          </span>
        </button>

        <input
          onChange={handleChange}
          value={search}
          className={styles.searchFormInput}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

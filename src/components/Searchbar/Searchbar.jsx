import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.scss';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSabmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ searchQuery: '' });
  }

  render() {
    const { searchQuery } = this.state;
    const { handleChange, handleSabmit } = this;
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
            value={searchQuery}
            className={styles.searchFormInput}
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

import { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return Notify.info('Please enter a search query.', {
        fontSize: '17px',
        position: 'center-center',
      });
    }
    onSubmit(search);
  };

  const handleChange = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.label}>Search</span>
        </button>

        <input
          value={search}
          onChange={handleChange}
          name="search"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(Searchbar);

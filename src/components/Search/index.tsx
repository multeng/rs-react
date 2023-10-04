import React from 'react';
import styles from './search.module.css';
import { SearchProps } from '../../types';

class Search extends React.PureComponent<SearchProps, object> {
  render(): React.ReactNode {
    const { handleInput, search } = this.props;
    return (
      <div className={styles.container}>
        <input
          className={styles.search}
          onChange={handleInput}
          type="search"
          placeholder="search..."
        />
        <button className={styles.searchButton} type="button" onClick={search}>
          search
        </button>
      </div>
    );
  }
}

export default Search;

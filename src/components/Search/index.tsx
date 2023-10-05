import React from 'react';
import styles from './search.module.css';
import { SearchProps, SearchState } from '../../types';

class Search extends React.PureComponent<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchWord: '' };
    this.handleInput = this.handleInput.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    const { setPokemons } = this.props;
    const searchWord = localStorage.getItem('searchWord');
    if (searchWord) {
      setPokemons(searchWord);
    } else setPokemons();
  }

  handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchWord: event.target.value });
  }

  search() {
    const { setPokemons } = this.props;
    const { searchWord } = this.state;
    localStorage.setItem('searchWord', searchWord);
    setPokemons(searchWord);
  }

  render(): React.ReactNode {
    const { searchWord } = this.state;

    return (
      <div className={styles.container}>
        <input
          className={styles.search}
          onChange={this.handleInput}
          type="search"
          placeholder="search..."
        />
        <button
          className={styles.searchButton}
          type="button"
          onClick={this.search}
          disabled={Boolean(!searchWord.length)}
        >
          search
        </button>
      </div>
    );
  }
}

export default Search;

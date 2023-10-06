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
      this.setState({ searchWord });
    } else setPokemons();
  }

  handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchWord: event.target.value });
  }

  search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { setPokemons } = this.props;
    const { searchWord } = this.state;
    localStorage.setItem('searchWord', searchWord);
    setPokemons(searchWord);
  }

  render(): React.ReactNode {
    const { searchWord } = this.state;

    return (
      <form className={styles.container} onSubmit={this.search}>
        <input
          className={styles.search}
          onChange={this.handleInput}
          type="search"
          placeholder="search..."
          ref={(input) => input && input.focus()}
          value={searchWord}
        />
        <button
          className={styles.searchButton}
          type="submit"
          disabled={Boolean(!searchWord.length)}
        >
          search
        </button>
      </form>
    );
  }
}

export default Search;

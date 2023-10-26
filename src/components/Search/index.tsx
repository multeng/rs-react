import React from 'react';
import Button from '../Button';
import styles from './search.module.css';
import { SearchProps, SearchState } from '../../types';

class Search extends React.PureComponent<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchWord: '' };
    this.handleInput = this.handleInput.bind(this);
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    const { setPokemons } = this.props;
    const searchWord = localStorage.getItem('searchWord');
    if (searchWord) {
      await setPokemons(searchWord);
      this.setState({ searchWord });
    } else await setPokemons();
  }

  handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchWord: event.target.value.toLowerCase() });
  }

  async search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { setPokemons } = this.props;
    const { searchWord } = this.state;
    localStorage.setItem('searchWord', searchWord);
    await setPokemons(searchWord);
  }

  render(): React.ReactNode {
    const { makeError } = this.props;
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
        <Button type="submit">search</Button>
        <Button func={makeError}>make error</Button>
      </form>
    );
  }
}

export default Search;

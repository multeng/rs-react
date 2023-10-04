import React from 'react';
import { AppState } from '../../types';
import { getPokemonsByName, getAllPokemons } from '../../api';
import CardList from '../CardList';
import styles from './app.module.css';
import './global.css';
import Search from '../Search';

class App extends React.PureComponent<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = { pokemons: [], isLoaded: false, searchWord: '' };
    this.handleInput = this.handleInput.bind(this);
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoaded: false });
    const pokemons = await getAllPokemons();
    this.setState({
      isLoaded: true,
      pokemons,
    });
  }

  handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchWord: event.target.value });
  }

  async search() {
    const { searchWord } = this.state;
    this.setState({ isLoaded: false });
    if (searchWord.length) {
      const pokemons = await getPokemonsByName(searchWord);
      this.setState({
        isLoaded: true,
        pokemons,
      });
    } else {
      const pokemons = await getAllPokemons();
      this.setState({
        isLoaded: true,
        pokemons,
      });
    }
  }

  render() {
    const { pokemons, isLoaded } = this.state;

    return (
      <div className={styles.container}>
        <Search search={this.search} handleInput={this.handleInput} />
        {isLoaded ? <CardList cards={pokemons} /> : 'loading...'}
      </div>
    );
  }
}

export default App;

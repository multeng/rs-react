import React from 'react';
import { AppState, Pokemon } from '../../types';
import { getAllPokemons, getPokemonsByName } from '../../api';
import CardList from '../CardList';
import styles from './app.module.css';
import './global.css';
import Search from '../Search';
import ErrorBoundary from '../ErrorBoundary';

class App extends React.PureComponent<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = { pokemons: [], isLoaded: false, isError: false };
    this.setPokemons = this.setPokemons.bind(this);
    this.makeError = this.makeError.bind(this);
  }

  async setPokemons(pokeName?: string) {
    let pokemons: Pokemon[] = [];
    if (pokeName?.length) {
      pokemons = await getPokemonsByName(pokeName);
    } else {
      pokemons = await getAllPokemons();
    }

    this.setState({
      isLoaded: true,
      pokemons,
    });
  }

  makeError() {
    this.setState({ isError: true });
  }

  render() {
    const { pokemons, isLoaded, isError } = this.state;

    return (
      <div className={styles.container}>
        <Search setPokemons={this.setPokemons} makeError={this.makeError} />
        <ErrorBoundary>
          {isLoaded ? <CardList error={isError} cards={pokemons} /> : 'loading...'}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

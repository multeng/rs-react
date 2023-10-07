import React from 'react';
import { AppState, Pokemon } from '../../types';
import { getPokemonsByName, getAllPokemons } from '../../api';
import CardList from '../CardList';
import styles from './app.module.css';
import './global.css';
import Search from '../Search';

class App extends React.PureComponent<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = { pokemons: [], isLoaded: false };
    this.setPokemons = this.setPokemons.bind(this);
  }

  async setPokemons(pokeName?: string) {
    let pokemons: Pokemon[] = [];
    this.setState({ isLoaded: false });
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

  render() {
    const { pokemons, isLoaded } = this.state;

    return (
      <div className={styles.container}>
        <Search setPokemons={this.setPokemons} />
        {isLoaded ? <CardList cards={pokemons} /> : 'loading...'}
      </div>
    );
  }
}

export default App;

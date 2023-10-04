import React from 'react';
import { AppState } from '../../types';
import { getPokemonsByName } from '../../api';
import CardList from '../CardList';
import styles from './app.module.css';
import './global.css';

class App extends React.PureComponent<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = { pokemons: [], isLoaded: false };
  }

  async componentDidMount() {
    this.setState({ isLoaded: false });
    const pokemons = await getPokemonsByName('pika');
    this.setState({
      isLoaded: true,
      pokemons,
    });
  }

  render() {
    const { pokemons, isLoaded } = this.state;

    return (
      <div className={styles.container}>
        {isLoaded ? <CardList cards={pokemons} /> : 'loading...'}
      </div>
    );
  }
}

export default App;

import React from 'react';
import { AppState } from '../../types';
import { getPokemonsByName } from '../../api';
import CardList from '../CadtList/CardtList';

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

    return <div>{isLoaded ? <CardList cards={pokemons} /> : 'loading...'}</div>;
  }
}

export default App;

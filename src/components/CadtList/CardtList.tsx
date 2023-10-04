import React from 'react';
import Card from '../Card/Card';
import { CardListProps } from '../../types';

class CardList extends React.PureComponent<CardListProps, object> {
  render() {
    const { cards } = this.props;
    return (
      <div>{cards.length && cards.map((pokemon) => <Card key={pokemon.id} data={pokemon} />)}</div>
    );
  }
}

export default CardList;

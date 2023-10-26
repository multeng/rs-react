import React from 'react';
import Card from '../Card';
import styles from './cardList.module.css';
import { CardListProps } from '../../types';

class CardList extends React.PureComponent<CardListProps, object> {
  render() {
    const { cards, error } = this.props;
    if (error) throw new Error();
    return (
      <div className={styles.cardList}>
        {cards.length
          ? cards.map((pokemon) => <Card key={pokemon.id} data={pokemon} />)
          : 'pokemons not found'}
      </div>
    );
  }
}

export default CardList;

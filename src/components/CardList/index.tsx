import React from 'react';
import Card from '../Card';
import styles from './cardList.module.css';
import { CardListProps } from '../../types';

export default function CardList({ cards }: CardListProps) {
  return (
    <div className={styles.cardList}>
      {cards.length
        ? cards.map((pokemon) => <Card key={pokemon.id} data={pokemon} />)
        : 'pokemons not found'}
    </div>
  );
}

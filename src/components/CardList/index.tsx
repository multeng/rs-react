import React from 'react';
import { CardListProps } from '../../types';
import styles from './cardList.module.css';
import Card from '../Card';

export default function CardList({ cards }: CardListProps) {
  return (
    <div className={styles.cardList}>
      {cards && cards.map((card) => <Card key={card.id} data={card} />)}
    </div>
  );
}

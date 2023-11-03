import React from 'react';
import { CardProps } from '../../types';
import styles from './card.module.css';
import notFound from '../../assets/no-image-svgrepo-com.svg';

export default function Card({ data }: CardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{data.name}</h3>
      <img
        src={data.sprites.front_default ? data.sprites.front_default : notFound}
        alt="default front pokemon"
        width={120}
        height={120}
      />
      <h4 className={styles.additionalInfoTitle}>Size</h4>
      <div className={styles.size}>
        <p>weight: {data.weight}</p>
        <p>height: {data.height}</p>
      </div>

      <h4 className={styles.additionalInfoTitle}>Stats</h4>
      <div className={styles.stats}>
        {data.stats.map((stat, i) => (
          <p key={`${stat.stat.name + i}`}>
            {stat.stat.name}: {stat.base_stat}
          </p>
        ))}
      </div>
    </div>
  );
}

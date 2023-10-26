import React from 'react';
import { ErrorComponentProps } from '../../types';
import Button from '../Button';
import styles from './error.module.css';

export default function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div className={styles.error}>
      <h1>Sorry.. there was an error</h1>
      {error && <div>{`${error}`}</div>}
      <Button func={() => window.location.reload()}>reload</Button>
    </div>
  );
}

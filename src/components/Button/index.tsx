import React from 'react';
import { ButtonProps } from '../../types';
import styles from './button.module.css';

export default function Button({ children, func, type = 'button' }: ButtonProps) {
  return (
    <button type={type} onClick={func} className={styles.button}>
      {children}
    </button>
  );
}

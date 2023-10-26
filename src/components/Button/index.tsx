import React from 'react';
import { ButtonProps } from '../../types';
import styles from './button.module.css';

class Button extends React.PureComponent<ButtonProps, object> {
  render() {
    const { children, func, type = 'button' } = this.props;
    return (
      <button type={type} onClick={func} className={styles.button}>
        {children}
      </button>
    );
  }
}

export default Button;

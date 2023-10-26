import React from 'react';
import { ErrorComponentProps } from '../../types';
import Button from '../Button';
import styles from './error.module.css';

class ErrorComponent extends React.PureComponent<ErrorComponentProps, object> {
  render() {
    const { error } = this.props;
    return (
      <div className={styles.error}>
        <h1>Sorry.. there was an error</h1>
        {error && <div>Error: {`${error}`}</div>}
        <Button func={() => window.location.reload()}>reload</Button>
      </div>
    );
  }
}

export default ErrorComponent;

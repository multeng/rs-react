import React from 'react';
import { CardProps } from '../../types';

class Card extends React.PureComponent<CardProps, object> {
  render() {
    const { data } = this.props;
    return <p>{data.name}</p>;
  }
}

export default Card;

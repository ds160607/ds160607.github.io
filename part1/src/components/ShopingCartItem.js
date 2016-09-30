import React, { Component, PropTypes } from 'react';
import styles from './ShopingCartItem.css';

export default class ShopingCartItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onItemRemoveClick: PropTypes.func.isRequired,
    onItemQTYChange: PropTypes.func.isRequired
  }

  render() {
    const {
      id,
      cartId,
      name,
      price,
      qty,
      onItemQTYChange,
      onItemRemoveClick
    } = this.props;

    const onItemQTYChangeHandler = (event) => {
        onItemQTYChange(id, event.target.value);
    }

    return (
      <tr>
        <td>{name}</td>
        <td>{price}</td>
        <td><input value={qty} onChange={onItemQTYChangeHandler}/></td>
        <td><button onClick={onItemRemoveClick.bind(this, id) }>Remove</button></td>
      </tr>
    );
  }
}
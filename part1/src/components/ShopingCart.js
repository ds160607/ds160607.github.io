import React, { Component, PropTypes } from 'react';
import { ShopingCartItem, ShopingCartSubmit } from '../components';
import styles from './ShopingCart.css';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';

export default class ShopingCart extends Component {

  static propTypes = {
    sortKey: PropTypes.string.isRequired,
    sortDirection: PropTypes.number.isRequired,
    itemsById: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,

    actions: PropTypes.shape({
      removeCartItem: PropTypes.func.isRequired,
      updateCartItemQTY: PropTypes.func.isRequired,
      toggleSorting: PropTypes.func.isRequired
    }).isRequired
  }

  render() {
    const {
      removeCartItem,
      updateCartItemQTY,
      toggleSorting
    } = this.props.actions;

    const {
      items,
      itemsById,
      sortKey,
      sortDirection
    } = this.props;

    let keyUpHandler = function (event, key) {    
      if (event.keyCode == 32 || event.keyCode == 13) {
        toggleSorting(key);
      }
    }

    //console.log("ShopingCart: ", this.props);

    return (
      <table className={styles.shopingCartList}>
        <thead>
          <tr>
            <th tabIndex="1" className={styles.sortable} onKeyUp={(ev) => { keyUpHandler(ev, "name") } } onClick={toggleSorting.bind(this, "name") }>Name</th>
            <th tabIndex="1" className={styles.sortable} onKeyUp={(ev) => { keyUpHandler(ev, "price") } } onClick={toggleSorting.bind(this, "price") }>Price</th>
            <th tabIndex="1" className={styles.sortable} onKeyUp={(ev) => { keyUpHandler(ev, "qty") } } onClick={toggleSorting.bind(this, "qty") }>QTY</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((item) => {
              const {
                id, cartId, name, price, qty
              } = itemsById[item];
              return (
                <ShopingCartItem
                  key={id}
                  cartId={cartId}
                  id={id}
                  name={name}
                  price={price}
                  qty={qty}
                  onItemRemoveClick = {removeCartItem}
                  onItemQTYChange = {updateCartItemQTY}
                  />);
            })
          }
        </tbody>
      </table >
    );
  }
}
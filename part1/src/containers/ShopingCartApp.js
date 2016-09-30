import React, { Component, PropTypes } from 'react';
import styles from './ShopingCartApp.css';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CartActions from '../actions/CartActions';
import { ShopingCart, ShopingCartSubmit } from '../components';

@connect(state => ({
  shopingCart: state.shopingCart
}))
export default class ShopingCartApp extends Component {

  static propTypes = {
    shopingCart: PropTypes.shape({
      items: PropTypes.array.isRequired,
      itemsById: PropTypes.object.isRequired,
      sortKey: PropTypes.string.isRequired,
      sortDirection: PropTypes.number.isRequired,
      isFetching: PropTypes.bool.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const {
      shopingCart: {
        items,
        itemsById,
        lastError,
        isFetching,
        sortKey,
        sortDirection
      },
      dispatch
    } = this.props;
    
    const actions = bindActionCreators(CartActions, dispatch);

    let glassStyle = classNames({
      [styles.glass]: true,
      [styles.glass_visible]: isFetching
    });

    return (
      <div className={styles.shopingCartApp}>
        <div className={styles.errorMessage}>{lastError}</div>
        <ShopingCart className={styles.shopingCartApp__cart} items={items} itemsById={itemsById} sortKey={sortKey} sortDirection={sortDirection} actions={actions} />
        <div className={styles.shopingCartApp__actions}>
          <ShopingCartSubmit items={items} actions={actions} />
        </div>
        <div className={glassStyle}>
        </div>
      </div>
    );
  }
}
import React, { Component, PropTypes } from 'react';
import mapValues from 'lodash/mapValues';

import styles from './ShopingCartSubmit.css';

export default class ShopingCartSubmit extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      submitCart: PropTypes.func.isRequired,
      addProduct: PropTypes.func.isRequired,
      fetchItems: PropTypes.func.isRequired,
      setErrorMessage: PropTypes.func.isRequired
    }).isRequired
  };

  render() {
    const {
      submitCart,
      addProduct,
      fetchItems,
      setErrorMessage,
    } = this.props.actions;

    let onAddProductHandler = (e) => {
      e.preventDefault();
      if (this.productName !== null && this.productPrice !== null) {
        let name = this.productName.value;
        let price = this.productPrice.value;

        if (name === "") {
            setErrorMessage("Product Name field is required");
            return;
        }

        try{
          price = parseFloat(price);
        } catch(err) {
          price = NaN;          
        }

        if (isNaN(price)) {
          setErrorMessage("Product Price field must be a number");
          return;
        }
        this.productName.value = "";
        this.productPrice.value = "";
        addProduct(name, (price)?price:0.0);
      }
    };

    return (
      <div>
        
        <form onSubmit={onAddProductHandler} className={styles.productForm}>
          <label >
            Name <input ref={(ref) => this.productName = ref}/>
          </label>
          <label >
            Price <input ref={(ref) => this.productPrice = ref}/>
          </label>
          <button type="submit">ADD PRODUCT</button>
        </form>

        <button className={styles.submitButton} onClick={submitCart}>SUBMIT</button>
        <button className={styles.fetchButton} onClick={fetchItems}>FECTH</button>
        <div className={styles.clear}></div>

      </div >
    );
  }

}
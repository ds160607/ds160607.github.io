import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

/**
 * Loads cart items from the "server" 
 */
export function fetchItems(testing) {
  return (dispatch) => {

    let url = 'json/items.json';

    if (testing && typeof (testing) === "string") {
      url = testing + url;
    }

    dispatch(requestItems());
    return fetch(url)
      .then(response => {
        if (response.status >= 400) {
          dispatch(receiveItemsFail("Something went wrong:" + JSON.stringify(response)));
          return null;
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json != null) {
          dispatch(receiveItems(json));
        }
      }).catch((err) => {
        dispatch(receiveItemsFail("Something went wrong 2: " + err));
      })
  }
}

/**
 * Will be called when submitting of cart items failed. 
 * There is no reason to call this manually.
 */
export function receiveSubmitCartFail(err) {
  return {
    type: types.RECEIVE_SUBMIT_CART_FAIL,
    err
  }
}

/**
 * Will be called when fetching  of cart items failed. 
 * There is no reason to call this manually.
 */
export function receiveItemsFail(err) {
  return {
    type: types.RECEIVE_ITEMS_FAIL,
    err
  }
}

/**
 * Will be called when fetching  of cart items is in progress.
 * There is no reason to call this manually.
 */
export function requestItems() {
  return {
    type: types.REQUEST_ITEMS
  }
}

/**
 * Will be called when fetching  of cart items is done successfully.
 * There is no reason to call this manually.
 */
export function receiveItems(items) {
  return {
    type: types.RECEIVE_ITEMS_SUCCESS,
    items
  }
}

/**
 * Updates a cart item quantity
 * id - cart item id
 */
export function updateCartItemQTY(id, qty) {
  return {
    type: types.UPDATE_CART_ITEM_QTY,
    id,
    qty
  };
}

/**
 * Removes a cart item 
 */
export function removeCartItem(id) {
  return {
    type: types.REMOVE_CART_ITEM,
    id
  };
}

/**
 * Adds a new item to the cart 
 */
export function addProduct(name, price) {
  return {
    type: types.ADD_PRODUCT,
    name,
    price
  };
}


/**
 * Will be called when submiting of cart items is in progress.
 * There is no reason to call this manually.
 */
export function requestSubmitCart() {
  return {
    type: types.REQUEST_SUBMIT_CART
  };
}

/**
 * Will be called when submiting  of cart items is done successfully.
 * There is no reason to call this manually.
 */
export function receiveSubmitCart() {
  return {
    type: types.RECEIVE_SUBMIT_CART_SUCCESS
  };
}

/**
 * Submits cart items to the "server"
 */
export function submitCart() {
  return (dispatch) => {
    dispatch(requestSubmitCart());
    return new Promise((resolve, reject) => {
      setTimeout(() => {                
        resolve(true);
      }, 1000);
    }).then((result)=>{
      if (result) {
        dispatch(receiveSubmitCart());
      } else {
        dispatch(receiveSubmitCartFail("error message"));
      }
    });
  }
}

/**
 * Switches a column sort order
 */
export function toggleSorting(key) {
  return {
    type: types.TOGGLE_SORT_CART,
    key
  };
}

/**
 * Displays an error message
 */
export function setErrorMessage(message) {
  return {
    type: types.SET_ERROR_MESSAGE,
    message
  };
}
import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { saveState, loadState } from '../utils/LocalStorage';

import ShopingCartApp from './ShopingCartApp.js';
import * as reducers from '../reducers';

/**
 * Middleware that save current application state each time it has changed
 */
function statePreserver({ getState }) {
  return (next) => (action) => {
    if (__DEV__) {
      console.log('will dispatch', action)
    }
    let returnValue = next(action)
    let state = getState();
    if (__DEV__) {
      console.log('state after dispatch', state)
    }
    saveState(state);
    return returnValue
  }
}

const reducer = combineReducers(reducers); //Currently there is only one reducer
const loadedState = loadState();
const store = createStore(reducer, loadedState, applyMiddleware(statePreserver, thunk));

/**
 * Entry point of the application
 */
export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ShopingCartApp />
        </Provider>
      </div>
    );
  }
}

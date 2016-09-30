import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import * as types from '../../src/constants/ActionTypes';
import * as actionCreators from '../../src/actions/CartActions.js';
import items from '../../src/json/items.json';

describe('actions', () => {

  it('should create an action to toggle a sorting order', () => {
    const key = "testKey";
    const expectedAction = {
      type: types.TOGGLE_SORT_CART,
      key
    };

    let actual = actionCreators.toggleSorting(key);
    expect(actual).to.deep.equal(expectedAction);
  });

  it('should create an action to remove a cart item', () => {
    const id = "testId";
    const expectedAction = {
      type: types.REMOVE_CART_ITEM,
      id
    };

    let actual = actionCreators.removeCartItem(id);
    expect(actual).to.deep.equal(expectedAction);
  });

  it('should create an action to update a qty of a cart item', () => {
    const id = "testId", qty = 10;
    const expectedAction = {
      type: types.UPDATE_CART_ITEM_QTY,
      id,
      qty
    };

    let actual = actionCreators.updateCartItemQTY(id, qty);
    expect(actual).to.deep.equal(expectedAction);
  });

  it('should create an action for successfully receive items', () => {
    const expectedAction = {
      type: types.RECEIVE_ITEMS_SUCCESS,
      items
    };

    let actual = actionCreators.receiveItems(items);
    expect(actual).to.deep.equal(expectedAction);
  });

  it('should create an action for receive items fail', () => {
    const err = "message";
    const expectedAction = {
      type: types.RECEIVE_ITEMS_FAIL,
      err
    };

    let actual = actionCreators.receiveItemsFail(err);
    expect(actual).to.deep.equal(expectedAction);
  });

  it('should create an action to submit a cart', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    return store.dispatch(
      actionCreators.submitCart())
      .then(() => {

        expect(store.getActions()).to.deep.equal([
          { type: types.REQUEST_SUBMIT_CART },
          { type: types.RECEIVE_SUBMIT_CART_SUCCESS }
        ]);
      })

  });

  it('should create REQUEST_ITEMS before fetching and RECEIVE_ITEMS_SUCCESS when fetching has been done', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    nock('http://localhost:3500/')
      .get('/json/items.json')
      .reply(200, items);

    //fetchMock.mock('*', { data: 'foo' });

    const expectedActions = [
      { type: types.REQUEST_ITEMS },
      {
        type: types.RECEIVE_ITEMS_SUCCESS,
        items
      }
    ];
    const store = mockStore();

    return store.dispatch(
      actionCreators.fetchItems('http://localhost:3500/'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  });

})
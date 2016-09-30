import { combineReducers  } from 'redux';

import * as reducers from '../../src/reducers';
import * as types from '../../src/constants/ActionTypes';

describe('reducers', () => {

    const reducer = combineReducers(reducers);

    const initialState = {
        shopingCart: {
            //TODO SPlit reducers
            sortKey: "",
            sortDirection: 0,

            isFetching: false,
            lastError: "",

            items: [],
            itemsById: {}
        }
    };


    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal(initialState)
    });

    it('should handle TOGGLE_SORT_CART', () => {
        expect(
            reducer(initialState, {
                type: types.TOGGLE_SORT_CART,
                key: "key"
            })
        ).to.deep.equal({
            ...initialState,
            shopingCart: {
                ...initialState.shopingCart,
            sortKey: "key",
            sortDirection: -1
            }
        })
    });

it('should handle TOGGLE_SORT_CART again', () => {
    expect(
        reducer(
            {
                ...initialState,
                shopingCart: {
                    ...initialState.shopingCart,
                    sortKey: "key",
                    sortDirection: -1
                }
            },
            {
                type: types.TOGGLE_SORT_CART,
                key: "key"
            })
    ).to.deep.equal({
        ...initialState,
            shopingCart: {
            ...initialState.shopingCart,
                sortKey: "key",
                sortDirection: 1
                }
            })
    });


    //TODO test other actions        

});
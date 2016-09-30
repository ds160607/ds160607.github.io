import * as types from '../constants/ActionTypes';
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';

const initialState = {    
    sortKey: "",
    sortDirection: 0,

    isFetching: false,
    lastError: "",

    items: [],
    itemsById: {}
}

export default function shopingCart(state = initialState, action) {
    switch (action.type) {

        case types.ADD_PRODUCT:

            let newId = 0;
            let cartId = 0;

            values(state.itemsById).forEach((item) => {
                let id = parseInt(item.id);                
                if (id >= newId) {
                    newId = id + 1;
                }
                if (item.cartId >= cartId) {
                    cartId = item.cartId + 1;
                }
            });

            newId = "" + newId;

            return {
                ...state,
                lastError: "",
                items: state.items.concat(newId),
                itemsById: {
                    ...state.itemsById,
                    [newId]: {
                        id: newId,
                        name: action.name,
                        price: action.price,
                        qty: 1,
                        cartId
                    }
                }
            }
        case types.SET_ERROR_MESSAGE:
            return {
                ...state,
                lastError: action.message
            }

        case types.REQUEST_SUBMIT_CART:
        case types.REQUEST_ITEMS:
            return {
                ...state,
                isFetching: true,
                lastError: ""
            }
        case types.RECEIVE_SUBMIT_CART_FAIL:
        case types.RECEIVE_ITEMS_FAIL:
            return {
                ...state,
                isFetching: false,
                lastError: "Something went wrong"
            }

        case types.RECEIVE_SUBMIT_CART_SUCCESS:
            return {
                ...state,
                isFetching: false,
                itemsById: {},
                items: []
            }
        case types.RECEIVE_ITEMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                itemsById: action.items,
                items: values(action.items).map((item) => { return item.id })
            }

        case types.UPDATE_CART_ITEM_QTY:
            try {
                let newQty = "";
                if (action.qty != undefined && action.qty.length > 0) {
                    newQty = parseInt(action.qty);
                }
                if (isNaN(newQty)) {
                    newQty = "";
                }
                return {
                ...state,
                    itemsById: mapValues(state.itemsById, (item) => {
                        return item.id === action.id ?
                            assign({}, item, { qty: newQty }) :
                            item
                    })
                }
            } catch (err) {
                return {...state };
            }

        case types.REMOVE_CART_ITEM:
            return {
                ...state,
                items: state.items.filter(id => id !== action.id),
                itemsById: omit(state.itemsById, action.id)
            }

        case types.SUBMIT_CART:
            return {
                ...state,
                lastError: "",
                items: [],
                itemsById: {}
            }

        case types.TOGGLE_SORT_CART:

            let key = state.sortKey;
            let order = state.sortDirection;

            if (action.key === key) {
                if (order === 0) {
                    order = -1;
                } else {
                    order *= -1;
                }
            } else {
                key = action.key;
                order = -1;
            }

            let sortedItems = _sortItems(state, key, order);

            return {
            ...state,
                sortKey: key,
                sortDirection: order,
                items: sortedItems
            }

        default:
            return state;
    }

    function _sortItems(state, key, order) {
        let sortedItemsArray = values(state.itemsById);

        if (order != 0) {
            sortedItemsArray.sort((a, b) => {
                const aVal = a[key] || 0
                const bVal = b[key] || 0

                let result = 0;
                if (aVal > bVal) {
                    result = order;
                } else if (aVal < bVal) {
                    result = -order;
                } else if (a.cartId > b.cartId) {
                    result = 1;
                } else {
                    result = -1;
                }
                return result;
            })
        }

        let sortedItems = sortedItemsArray.map((item) => { return item.id });
        return sortedItems;
    }
}
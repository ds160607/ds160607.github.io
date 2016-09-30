
/**
 * Loads the application state from the Local Storage
 */
export const loadState = () => {
    try {

        let state = localStorage.getItem('state');
        if (state == null) {
            return undefined;
        }
        state = JSON.parse(state);
        state.shopingCart.lastError = "";
        state.shopingCart.isFetching = false;
        return state;

    } catch (err) {
        return undefined;
    }
}

/**
 * Saves current application state to the Local Storage
 */
export const saveState = (state) => {
    try {
        const stateString = JSON.stringify(state);
        localStorage.setItem('state', stateString);
    } catch (err) {

    }
}
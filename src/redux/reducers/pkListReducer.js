import actionTypes from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.APPEND_POKE:
            return {
                ...state,
                ...action.pokemon,
            };

        default:
            return state;
    }
};
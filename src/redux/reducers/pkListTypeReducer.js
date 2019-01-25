import actionTypes from "../actions/actionTypes";

export default (state = [], action) => {
    switch (action.type) {
        case actionTypes.APPEND_POKE_BY_TYPE:
            return {
                ...state,
                ...action.pokemonByType,
            };
        case actionTypes.REMOVE_POKE_BY_TYPE:
            return action.pokemonByType;

        default:
            return state;
    }
};
import actionTypes from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.APPEND_POKE_DETAIL:
            return {
                ...state,
                ...action.pokemonDetail,
            };
        case actionTypes.REMOVE_POKE_DETAIL:
            return action.pokemonDetail;

        default:
            return state;
    }
};
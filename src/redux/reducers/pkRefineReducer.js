import actionTypes from "../actions/actionTypes";

const initialState = {
    isRefineByPokemonType: false,
    type: 'any',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REFINE_POKE_BY_TYPE:
            return {
                ...state,
                ...action.pokemonRefine,
            };

        default:
            return state;
    }
};
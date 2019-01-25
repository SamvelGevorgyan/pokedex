import actionTypes from "./actionTypes";

export const removePokemonDetail = () => {
    return {
        type: actionTypes.REMOVE_POKE_DETAIL,
        pokemonDetail: {}
    };
};

export const appendPokemonDetail = payload => {
    return {
        type: actionTypes.APPEND_POKE_DETAIL,
        pokemonDetail: payload
    };
};
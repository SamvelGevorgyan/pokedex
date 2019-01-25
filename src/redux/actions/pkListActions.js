import actionTypes from "./actionTypes";

export const appendPokemon = payload => {
    return {
        type: actionTypes.APPEND_POKE,
        pokemon: payload
    };
};
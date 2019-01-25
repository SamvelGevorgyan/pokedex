import actionTypes from "./actionTypes";

export const removePokemonListByType = () => ({
    type: actionTypes.REMOVE_POKE_BY_TYPE,
    pokemonByType: [],
});

export const appendPokemonByType = payload => ({
    type: actionTypes.APPEND_POKE_BY_TYPE,
    pokemonByType: payload,
});

export const refinePokemonByType = payload => ({
    type: actionTypes.REFINE_POKE_BY_TYPE,
    pokemonRefine: payload,
});
import API from "../../API";
import {appendPokemon} from "../actions/pkListActions";
import {appendPokemonDetail} from "../actions/pkDetailActions";
import {appendPokemonByType} from "../actions/pkListRefineActions";

export const getPokemon = pokemon => dispatch => {
    return new Promise(
        (resolve, reject) => {
            API.get(`pokemon-form?offset=0&limit=949`).then(res => {
                resolve();
                dispatch(appendPokemon(res.data));
            }).catch(err => {
                reject(err);
            });
        });
};

export const getPokemonDetail = pokemonId => dispatch => {
    return new Promise(
        (resolve, reject) => {
            API.get(`pokemon/${pokemonId}`).then(res => {
                resolve();
                dispatch(appendPokemonDetail(res.data));
            }).catch(err => {
                reject(err);
            });
        });
};

export const getPokemonByType = type => dispatch => {
    return new Promise(
        (resolve, reject) => {
            API.get(`type/${type}/`).then(res => {
                resolve();
                dispatch(appendPokemonByType(res.data));
            }).catch(err => {
                reject(err);
            });
        });
};
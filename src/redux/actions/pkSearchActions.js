import actionTypes from "./actionTypes";

export const sendSearchQuery = payload => {
    return {
        type: actionTypes.SEARCH_NAME_QUERY,
        query: payload
    };
};
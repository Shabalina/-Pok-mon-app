import {
    filterFailure,
    filterSuccess,
    filterRequest,
  } from '../actions/filterActions';

import {filter} from '../api.js'
  
  export const pokemonFilteredMiddleware = store => next => action => {
    if (action.type === filterRequest.toString()) {
        filter(action.payload)
        .then(pokemons => {
          store.dispatch(filterSuccess(pokemons));
        })
        .catch(error => {
          store.dispatch(filterFailure(error));
        });
    }
    return next(action);
  };
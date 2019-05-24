import {
    loadFailure,
    loadSuccess,
    loadRequest,
  } from '../actions/loadActions';

import {loadURL, pokemon} from '../api.js'
  
  export const pokemonLoadMiddleware = store => next => action => {
    if (action.type === loadRequest.toString()) {
        loadURL()
        .then(results => Promise.all(results.map(result =>pokemon(result.url))))
        .then(pokemons => {
          console.log(pokemons)  
          store.dispatch(loadSuccess(pokemons));
        })
        .catch(error => {
          store.dispatch(loadFailure(error));
        });
    }
    return next(action);
  };
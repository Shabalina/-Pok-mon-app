import {
    loadFailure,
    loadSuccess,
    loadRequest,
    
  } from '../actions/loadActions';

import {loadURL, loadPokemon} from '../api.js'
  
  export const pokemonLoadMiddleware = store => next => action => {
    if (action.type === loadRequest.toString()) {
        var loadObj = {};
        loadURL(action.payload)
        .then(results => {
            console.log(results.results)
            loadObj.next = results.next;
            return Promise.all(results.results.map(result =>loadPokemon(result.url)))
        })
        .then(pokemons => {          
          loadObj.pokemons = pokemons;
          console.log(loadObj)  
          store.dispatch(loadSuccess(loadObj));
        })
        .catch(error => {
          store.dispatch(loadFailure(error));
        });
    }
    return next(action);
  };
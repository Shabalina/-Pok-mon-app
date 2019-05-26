import {
    filterFailure,
    filterSuccess,
    filterRequest,
  } from '../actions/filterActions';

import {filter, loadPokemon} from '../api.js'
  
  export const pokemonFilterMiddleware = store => next => action => {
    if (action.type === filterRequest.toString()) {
        console.log('in middle')
        filter(action.payload)
        .then(
            results => Promise.all(
                results.map(result => loadPokemon(result.pokemon.url))
                )
            )
        .then(pokemons => {
          console.log(pokemons)  
          store.dispatch(filterSuccess(pokemons));
        })
        .catch(error => {
          store.dispatch(filterFailure(error));
        });
    }
    return next(action);
  };
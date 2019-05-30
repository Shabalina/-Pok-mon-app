import { takeLatest, put, call, all, fork } from 'redux-saga/effects';
import {
    loadFailure,
    loadSuccess,
    loadRequest,
    filterFailure,
    filterSuccess,
    filterRequest,
  } from './actions';
import {loadURL, filter, loadPokemon} from './api.js'

function* pokemonFilterFlow(action){
  const type = action.payload  
  try {        
      const results = yield call(filter, type);      
      const pokemons = yield all(
        results.map(result => call (loadPokemon, result.pokemon.url))
      )
      yield put(filterSuccess(pokemons))      
  } catch (error) {
      yield put(filterFailure(error));
  }
}

function* pokemonFlow(action) {    
  const urlString = action.payload  
  try {        
      const results = yield call(loadURL, urlString);      
      const pokemons = yield all(
        results.results.map(result => call (loadPokemon, result.url))
      )
      yield put(loadSuccess({next: results.next, pokemons: pokemons}))      
  } catch (error) {
      yield put(loadFailure(error));
  }
}

function* fetchPokemonFlowWatcher() {
  yield takeLatest(loadRequest, pokemonFlow);
}

export default function*() {
    yield fork (fetchPokemonFlowWatcher);
    yield takeLatest (filterRequest, pokemonFilterFlow);  
  }
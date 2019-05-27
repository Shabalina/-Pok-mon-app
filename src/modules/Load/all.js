import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  loadRequest,
  loadSuccess,
  loadFailure,
  filterRequest,
  filterSuccess,
  filterFailure,
} from './actions';

const pokemons = handleActions(
    {
      [loadRequest]: (_state, action) => {
        return action.payload 
          ? _state
          : []
        
      },
      [filterRequest]: () => [],
      [loadSuccess]: (_state, action) => {
      //  console.log(action.payload, action.payload.pokemons, _state)
        return _state.concat(action.payload.pokemons)
      },
      [filterSuccess]: (_state, action) => action.payload,
    },
    [], 
  );

  const next = handleActions(
    {
      [loadSuccess]: (_state, action) => action.payload.next,
      [filterSuccess]: () => null
    },
    null
  );
  
  const isLoading = handleActions(
    {
      [loadRequest]: () => true,
      [loadSuccess]: () => false,
      [loadFailure]: () => false,
      [filterRequest]: () => true,
      [filterSuccess]: () => false,
      [filterFailure]: () => false,
    },
    false,
  );
  
  const error = handleActions(
    {
      [loadRequest]: () => null,
      [loadFailure]: (_state, action) => action.payload,
      [filterRequest]: () => null,
      [filterFailure]: (_state, action) => action.payload,
    },
    null,
  );
  
  export default combineReducers({
    pokemons,
    next,
    isLoading,
    error,
  });
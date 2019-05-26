import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  loadRequest,
  loadSuccess,
  loadFailure,
} from '../actions/loadActions';
import {
  filterRequest,
  filterSuccess,
  filterFailure,
} from '../actions/filterActions';

const pokemons = handleActions(
    {
      [loadRequest]: () => [],
      [filterRequest]: () => [],
      [loadSuccess]: (_state, action) => action.payload,
      [filterSuccess]: (_state, action) => action.payload,
    },
    [], 
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
    isLoading,
    error,
  });
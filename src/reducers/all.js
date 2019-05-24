import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  loadRequest,
  loadSuccess,
  loadFailure,
} from '../actions/loadActions';

const pokemons = handleActions(
    {
      [loadRequest]: () => [],
      [loadSuccess]: (_state, action) => action.payload,
    },
    [], 
  );
  
  const isLoading = handleActions(
    {
      [loadRequest]: () => true,
      [loadSuccess]: () => false,
      [loadFailure]: () => false,
    },
    false,
  );
  
  const error = handleActions(
    {
      [loadRequest]: () => null,
      [loadFailure]: (_state, action) => action.payload,
    },
    null,
  );
  
  export default combineReducers({
    pokemons,
    isLoading,
    error,
  });
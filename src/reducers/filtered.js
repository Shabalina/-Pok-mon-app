import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  filterRequest,
  filterSuccess,
  filterFailure,
} from '../actions/filterActions';

const pokemons = handleActions(
    {
      [filterRequest]: () => [],
      [filterSuccess]: (_state, action) => action.payload,
    },
    [], 
  );
  
  const isLoading = handleActions(
    {
      [filterRequest]: () => true,
      [filterSuccess]: () => false,
      [filterFailure]: () => false,
    },
    false,
  );
  
  const error = handleActions(
    {
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
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  loadTypesRequest,
  loadTypesSuccess,
  loadTypesFailure,
} from '../actions/loadTypesActions';

const types = handleActions(
    {
      [loadTypesRequest]: () => [],
      [loadTypesSuccess]: (_state, action) => action.payload,
    },
    [], 
  );
  
  const isLoading = handleActions(
    {
      [loadTypesRequest]: () => true,
      [loadTypesSuccess]: () => false,
      [loadTypesFailure]: () => false,
    },
    false,
  );
  
  const error = handleActions(
    {
      [loadTypesRequest]: () => null,
      [loadTypesFailure]: (_state, action) => action.payload,
    },
    null,
  );
  
  export default combineReducers({
    types,
    isLoading,
    error,
  });
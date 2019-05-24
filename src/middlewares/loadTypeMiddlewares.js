import {
    loadTypesFailure,
    loadTypesSuccess,
    loadTypesRequest,
  } from '../actions/loadTypesActions';

import {loadTypes} from '../api.js'
  
  export const loadTypeListMiddleware = store => next => action => {
    if (action.type === loadTypesRequest.toString()) {
        loadTypes()
        .then(types => {
          console.log(types)  
          store.dispatch(loadTypesSuccess(types));
        })
        .catch(error => {
          store.dispatch(loadTypesFailure(error));
        });
    }
    return next(action);
  };
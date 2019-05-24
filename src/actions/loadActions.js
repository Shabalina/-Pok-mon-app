import { createAction } from 'redux-actions';

export const loadRequest = createAction('LOAD_REQUEST');
export const loadSuccess = createAction('LOAD_SUCCESS');
export const loadFailure = createAction('LOAD_FAILURE');
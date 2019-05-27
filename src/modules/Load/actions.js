import { createAction } from 'redux-actions';

export const loadRequest = createAction('LOAD_REQUEST');
export const loadSuccess = createAction('LOAD_SUCCESS');
export const loadFailure = createAction('LOAD_FAILURE');
export const filterRequest = createAction('FILTER_REQUEST');
export const filterSuccess = createAction('FILTER_SUCCESS');
export const filterFailure = createAction('FILTER_FAILURE');
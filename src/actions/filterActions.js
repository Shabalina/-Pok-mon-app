import { createAction } from 'redux-actions';

export const filterRequest = createAction('FILTER_REQUEST');
export const filterSuccess = createAction('FILTER_SUCCESS');
export const filterFailure = createAction('FILTER_FAILURE');
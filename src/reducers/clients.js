import { Map, fromJS } from 'immutable';
import { __, identity, merge, propOr } from 'ramda';
import * as listActions from '../actions/clients';
import * as editActions from '../actions/client';

const actions = merge(listActions.actions, editActions.actions);

const initialState = fromJS({
  pending: false,
  customers: Map(),
  savedCustomer: false,
  error: '',
});

const reducers = {
  [actions.FETCH_CUSTOMERS_PENDING]: state => state.set('pending', true),

  [actions.FETCH_CUSTOMERS_FULFILLED]: (state, action) => {
    const customers = action.payload.map(customer => [customer.id, fromJS(customer)]);
    return state
      .set('customers', new Map(customers))
      .set('pending', false)
      .set('savedCustomer', false);
  },

  [actions.SAVE_CUSTOMER_PENDING]: state =>
      state
        .set('savedCustomer', false)
        .set('pending', true),

  [actions.SAVE_CUSTOMER_FULFILLED]: state =>
      state
        .set('savedCustomer', true)
        .set('pending', false),

  [actions.DELETE_CUSTOMER_FULFILLED]: (state, action) =>
      state.deleteIn(['customers', action.payload.id])
        .set('pending', false),

  [actions.DELETE_CUSTOMER_PENDING]: state =>
      state.set('pending', true),

  [actions.SAVE_CUSTOMER_REJECTED]: (state, action) =>
      state
        .set('error', action.payload)
        .set('pending', false),
};

const getReducer = propOr(identity, __, reducers);

export default (state = initialState, action) => getReducer(action.type)(state, action);

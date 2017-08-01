import { fromJS, List, Map } from 'immutable';
import { __, identity, propOr } from 'ramda';
import * as validateAddressActions from '../actions/validateAddress';

const actions = validateAddressActions.actions;

const initialState = fromJS({
  pending: false,
  valid: true,
  errorMessage: '',
  validatedAddress: Map(),
  addresses: List(),
});

const reducers = {
  [actions.ADDRESS_VALIDATION_REJECTED]: (state, { payload }) =>
      state
        .merge(fromJS({ pending: false, valid: false, errorMessage: payload })),

  [actions.ADDRESS_VALIDATION_FULFILLED]: (state, { payload }) =>
      state.merge(fromJS({ pending: false, valid: true, addresses: List(payload) })),

  [actions.ADDRESS_VALIDATION_PENDING]: state =>
      state
        .merge(fromJS({ pending: true, valid: true, errorMessage: '', validatedAddress: Map(), addresses: List() })),

  [actions.ADDRESS_VALIDATION_RESET]: state =>
      state.merge(fromJS({ addresses: List() })),
};

const getReducer = propOr(identity, __, reducers);

export default (state = initialState, action) => getReducer(action.type)(state, action);

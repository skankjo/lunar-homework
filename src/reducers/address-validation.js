import { fromJS, Map } from 'immutable';
import * as actions from '../actions/validateAddress';

const initialState = fromJS({
  pending: false,
  valid: true,
  errorMessage: '',
  validatedAddress: Map(),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADDRESS_VALIDATION_REJECTED:
      return state
        .merge(fromJS({ pending: false, valid: false, ...action.payload }));

    case actions.ADDRESS_VALIDATION_FULFILLED:
      return state.merge(fromJS({ pending: false, valid: true, ...action.payload }));

    case actions.ADDRESS_VALIDATION_PENDING:
      return state
        .merge(fromJS({ pending: true, valid: true, errorMessage: '', validatedAddress: Map() }));
    default: return state;
  }
};

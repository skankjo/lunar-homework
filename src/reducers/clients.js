import { Map, fromJS } from 'immutable';

const initialState = fromJS({
  pending: false,
  customers: Map(),
  savedCustomer: false,
  error: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CUSTOMERS_PENDING':
      return state.set('pending', true);

    case 'FETCH_CUSTOMERS_FULFILLED': {
      const customers = action.payload.map(customer => [customer.id, fromJS(customer)]);
      return state
        .set('customers', new Map(customers))
        .set('pending', false)
        .set('savedCustomer', false);
    }

    case 'SAVE_CUSTOMER_PENDING':
      return state
        .set('savedCustomer', false)
        .set('pending', true);

    case 'SAVE_CUSTOMER_FULFILLED':
      return state
        .set('savedCustomer', true)
        .set('pending', false);

    case 'DELETE_CUSTOMER_FULFILLED':
      return state.deleteIn(['customers', action.payload.id])
        .set('pending', false);

    case 'DELETE_CUSTOMER_PENDING':
      return state.set('pending', true);

    case 'SAVE_CUSTOMER_REJECTED':
      return state
        .set('error', action.payload)
        .set('pending', false);

    default: return state;
  }
};

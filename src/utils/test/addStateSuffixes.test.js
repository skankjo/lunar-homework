import test from 'ava';
import addStateSuffixes from '../addStateSuffixes';

test('should add state suffixes to action names', (t) => {
  const actions = ['SAVE_CUSTOMER', 'DELETE_CUSTOMER'];
  const expectedActions = {
    SAVE_CUSTOMER: 'SAVE_CUSTOMER',
    SAVE_CUSTOMER_PENDING: 'SAVE_CUSTOMER_PENDING',
    SAVE_CUSTOMER_FULFILLED: 'SAVE_CUSTOMER_FULFILLED',
    SAVE_CUSTOMER_REJECTED: 'SAVE_CUSTOMER_REJECTED',
    DELETE_CUSTOMER: 'DELETE_CUSTOMER',
    DELETE_CUSTOMER_PENDING: 'DELETE_CUSTOMER_PENDING',
    DELETE_CUSTOMER_FULFILLED: 'DELETE_CUSTOMER_FULFILLED',
    DELETE_CUSTOMER_REJECTED: 'DELETE_CUSTOMER_REJECTED',
  };

  const statefulActions = addStateSuffixes(actions);

  t.deepEqual(statefulActions, expectedActions);
});

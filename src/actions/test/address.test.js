import test from 'ava';
import 'isomorphic-fetch';
import configureStore from 'redux-mock-store';
import { Map, fromJS } from 'immutable';
import promiseMiddleware from 'redux-promise-middleware';
import sinon from 'sinon';
import thunkMiddleware from 'redux-thunk';
import validateAddress from '../validateAddress';
import { responseOK } from './utils';

test.before(() => {
  sinon.stub(global, 'fetch');
});

test.after(() => {
  global.fetch.restore();
});

test.beforeEach((t) => {
  const mockStore = configureStore([thunkMiddleware, promiseMiddleware()]);
  const data = {
    clients: Map(),
    address: fromJS({
      validatedAddress: Map(),
    }),
  };
  t.context = { // eslint-disable-line no-param-reassign
    store: mockStore(data),
    customer: {
      email: 'aaa@aaa.lt',
      fullname: 'aaa',
      city: 'Vilnius',
      street: 'Kauno g.',
      housenumber: '1',
    },
  };
});

test.afterEach(() => {
  global.fetch.reset();
});

test('error response from geocode', (t) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve) => {
    const store = t.context.store;
    const customer = t.context.customer;

    global.fetch.returns(responseOK({
      status: 'ERROR',
      error_message: 'Error occurred',
    }));

    store.dispatch(validateAddress(customer))
      .catch((err) => {
        t.is(err.errorMessage, 'Error occurred');
        resolve(err.errorMessage);
      });
  });
});

test('too little data to find matching address', (t) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve) => {
    const store = t.context.store;
    const customer = t.context.customer;

    global.fetch.returns(responseOK({
      status: 'OK',
      results: [{
        address_components: [],
      }],
    }));

    store.dispatch(validateAddress(customer))
      .catch((err) => {
        t.is(err.errorMessage, 'Not enough data to find exact address');
        resolve(err.errorMessage);
      });
  });
});

test('too many variants of address', (t) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve) => {
    const store = t.context.store;
    const customer = t.context.customer;

    global.fetch.returns(responseOK({
      status: 'OK',
      results: [
        {
          address_components: [
            { short_name: 'Vilnius', types: ['locality'] },
            { short_name: 'Kauno g.', types: ['route'] },
            { short_name: '1', types: ['street_number'] },
            { short_name: '23311', types: ['postal_code'] },
          ],
        },
        {
          address_components: [
            { short_name: 'Utena', types: ['locality'] },
            { short_name: 'Vilniaus g.', types: ['route'] },
            { short_name: '13', types: ['street_number'] },
            { short_name: '09878', types: ['postal_code'] },
          ],
        },
      ],
    }));

    store.dispatch(validateAddress(customer))
      .catch((err) => {
        t.is(err.errorMessage, 'Too many variants of address by provided data of yours. Please, specify your address more precisely');
        resolve(err.errorMessage);
      });
  });
});

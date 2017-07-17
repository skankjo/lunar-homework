import test from 'ava';
import 'isomorphic-fetch';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import promiseMiddleware from 'redux-promise-middleware';
import sinon from 'sinon';
import thunkMiddleware from 'redux-thunk';
import fetchClients from '../clients';
import { deleteCustomer } from '../client';
import { responseOK } from './utils';

test.before(() => {
  sinon.stub(global, 'fetch');
});

test.after(() => {
  global.fetch.restore();
});

test.beforeEach((t) => {
  const mockStore = configureStore([thunkMiddleware, promiseMiddleware()]);
  const data = { clients: Map() };
  t.context = { // eslint-disable-line no-param-reassign
    store: mockStore(data),
  };
});

test.afterEach(() => {
  global.fetch.reset();
});

test('get empty list of clients', (t) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve) => {
    const store = t.context.store;
    const expectedActions = [{ type: 'FETCH_CUSTOMERS_PENDING' }, { type: 'FETCH_CUSTOMERS_FULFILLED', payload: [] }];

    global.fetch.returns(responseOK({ data: [] }));

    store.dispatch(fetchClients())
      .then(() => {
        const actions = store.getActions();
        t.deepEqual(actions, expectedActions);
        resolve();
      });
  });
});

test('get list of customers', (t) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve) => {
    const store = t.context.store;
    const expectedActions = [
      {
        type: 'FETCH_CUSTOMERS_PENDING',
      },
      {
        type: 'FETCH_CUSTOMERS_FULFILLED',
        payload: [
          {
            id: 'aaa',
            email: 'aaa@aaa.lt',
            fullname: 'Erika Gaila',
            city: 'Vilnius',
            street: 'Kauno g.',
            housenumber: '1',
            zip: '23112',
          },
        ],
      },
    ];

    global.fetch.returns(responseOK({ data: [{
      id: 'aaa',
      email: 'aaa@aaa.lt',
      metadata: {
        fullname: 'Erika Gaila',
        city: 'Vilnius',
        street: 'Kauno g.',
        housenumber: '1',
        zip: '23112',
      },
    }] }));

    store.dispatch(fetchClients())
      .then(() => {
        const actions = store.getActions();
        t.deepEqual(actions, expectedActions);
        resolve();
      });
  });
});

test('delete customer', (t) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve) => {
    const store = t.context.store;
    const expectedActions = [
      {
        type: 'DELETE_CUSTOMER_PENDING',
      },
      {
        type: 'DELETE_CUSTOMER_FULFILLED',
        payload: {
          deleted: true,
          id: 'aaa',
        },
      },
    ];

    global.fetch.returns(responseOK({ deleted: true, id: 'aaa' }));

    store.dispatch(deleteCustomer('aaa'))
      .then(() => {
        const actions = store.getActions();
        t.deepEqual(actions, expectedActions);
        resolve();
      });
  });
});

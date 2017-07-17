import test from 'ava';
import 'isomorphic-fetch';
import configureStore from 'redux-mock-store';
import { Map, fromJS } from 'immutable';
import promiseMiddleware from 'redux-promise-middleware';
import sinon from 'sinon';
import thunkMiddleware from 'redux-thunk';
import config from '../../config';
import fetchClients from '../clients';
import { deleteCustomer, saveCustomer } from '../client';
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

test('save customer', (t) => { // eslint-disable-line arrow-body-style
  return new Promise((resolve, reject) => {
    const store = t.context.store;

    const expectedActions = [
      {
        type: 'ADDRESS_VALIDATION_PENDING',
      },
      {
        type: 'SAVE_CUSTOMER_PENDING',
      },
      {
        type: 'ADDRESS_VALIDATION_FULFILLED',
        payload: {
          validatedAddress: fromJS({
            city: 'Vilnius',
            street: 'Kauno g.',
            housenumber: '1',
            zip: '23311',
          }),
        },
      },
      {
        type: 'SAVE_CUSTOMER_FULFILLED',
        payload: {
          id: 'aaa',
          email: 'aaa@aaa.lt',
          metadata: {
            fullname: 'aaa',
            city: 'Vilnius',
            street: 'Kauno g.',
            housenumber: '1',
            zip: '23311',
          },
        },
      },
    ];

    const customer = {
      email: 'aaa@aaa.lt',
      fullname: 'aaa',
      city: 'Vilnius',
      street: 'Kauno g.',
      housenumber: '1',
    };

    const { city, street, housenumber, zip } = customer;
    const address = [city, street, housenumber, zip].reduce((acc, item) => (item ? `${acc}${item},` : acc), '');

    global.fetch.withArgs(`${config.geocode.baseUrl}?address=${address}&key=${config.geocode.key}`).returns(responseOK({
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
      ],
    }));

    global.fetch.withArgs(`${config.stripe.baseUrl}customers`).returns(responseOK({
      id: 'aaa',
      email: 'aaa@aaa.lt',
      metadata: {
        fullname: 'aaa',
        city: 'Vilnius',
        street: 'Kauno g.',
        housenumber: '1',
        zip: '23311',
      },
    }));

    store.dispatch(saveCustomer(customer)).then(() => {
      const actions = store.getActions();
      t.deepEqual(actions, expectedActions);
      resolve();
    })
    .catch(err => reject(err));
  });
});

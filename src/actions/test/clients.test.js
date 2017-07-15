import test from 'ava';
import configureStore from 'redux-mock-store';
import mockFetch from 'mock-fetch-api';
import promiseMiddleware from 'redux-promise-middleware';
import sinon from 'sinon';
import thunkMiddleware from 'redux-thunk';
import fetchClients from '../clients';
import config from '../../config';

test('list clients', (t) => {
  return new Promise((resolve, reject) => {
    const mockStore = configureStore([thunkMiddleware, promiseMiddleware()]);
    const data = { clients: [] };
    const store = mockStore(data);

    mockFetch.when('GET', `${config.stripe.baseUrl}customers`)
      .respondWith(200, { data: [] });

    store.dispatch(fetchClients())
      .then(() => {
        const actions = store.getActions();
        const state = store.getState();
        console.log(`actions: ${JSON.stringify(actions)}`);
        console.log(`state: ${JSON.stringify(state)}`);
      });
  });
});

import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { fromJS, List } from 'immutable';
import { mount, shallow } from 'enzyme';
import { Clients } from '../Clients';

test.beforeEach((t) => {
  t.context = { // eslint-disable-line no-param-reassign
    getCustomers: () => {},
    removeCustomer: () => {},
    clients: fromJS({
      customers: List(),
    }),
  };
});

test('Should wait for data', (t) => {
  const clients = t.context.clients.merge(fromJS({
    pending: true,
  }));

  const wrapper = shallow(
    <Clients getCustomers={t.context.getCustomers} removeCustomer={t.context.removeCustomer} clients={clients} /> // eslint-disable-line
  );

  t.true(wrapper.find('Dimmer').prop('active'));
});

test('Should display customers data', (t) => {
  const clients = t.context.clients.merge(fromJS({
    pending: false,
  }));

  const wrapper = shallow(
    <Clients getCustomers={t.context.getCustomers} removeCustomer={t.context.removeCustomer} clients={clients} /> // eslint-disable-line
  );

  t.false(wrapper.find('Dimmer').prop('active'));
});

test('Should call action', (t) => {
  const getCustomers = sinon.spy();
  const clients = t.context.clients.merge(fromJS({
    pending: false,
  }));

  mount(
    <Clients getCustomers={getCustomers} removeCustomer={t.context.removeCustomer} clients={clients} /> // eslint-disable-line
  );

  t.is(getCustomers.callCount, 1);
});

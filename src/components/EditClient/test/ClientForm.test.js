import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { fromJS, Map } from 'immutable';
import { mount } from 'enzyme';
import { ClientForm } from '../ClientForm';

test('should display validation errors', (t) => {
  const match = {
    params: {},
  };
  const saveCustomer = sinon.spy();
  const clients = fromJS({
    customers: Map(),
  });
  const address = Map();

  const wrapper = mount(
    <ClientForm // eslint-disable-line react/jsx-filename-extension
      match={match}
      saveCustomer={saveCustomer}
      clients={clients}
      address={address}
    />,
  );
  const submit = wrapper.find('#submit');
  t.is(submit.length, 1);
  submit.simulate('click');
  t.is(wrapper.find('.error-message').length, 5);
});

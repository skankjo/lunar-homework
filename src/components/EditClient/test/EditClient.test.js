import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { fromJS, Map } from 'immutable';
import { mount } from 'enzyme';
import { EditClient } from '../EditClient';

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
    <EditClient // eslint-disable-line react/jsx-filename-extension
      match={match}
      saveCustomer={saveCustomer}
      clients={clients}
      address={address}
    />,
  );
  const submit = wrapper.find('button');
  t.is(submit.length, 1);
  const form = wrapper.find('Form');
  form.simulate('submit');
  t.is(wrapper.find('.FormError').length, 7);
});

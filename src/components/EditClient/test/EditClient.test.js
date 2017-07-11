import test from 'ava';
import React from 'react';
import { fromJS, List, Map } from 'immutable';
import { shallow } from 'enzyme';
import { EditClient } from '../EditClient';

test('should display validation errors', (t) => {
  const match = {
    params: {},
  };
  const saveCustomer = () => {};
  const clients = fromJS({
    customers: Map(),
  });
  const address = Map();

  const wrapper = shallow(
    <EditClient match={match} saveCustomer={saveCustomer} clients={clients} address={address} />,
  );

  const form = wrapper.render();
  const submit = form.find('button');
  t.is(submit.length, 1);
  submit.shallow().simulate('click');
  t.is(form.find('.-hasError').length, 1);
});

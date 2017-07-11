import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import Line from '../Line';

test('outputs one table row with customer data', (t) => {
  const customer = fromJS({
    id: 1,
    fullname: 'aaa',
  });

  const removeCustomer = sinon.spy();

  const wrapper = shallow(
    <Line customer={customer} removeCustomer={removeCustomer} />, // eslint-disable-line
  );
  t.is(wrapper.find('tr').length, 1);
  t.is(wrapper.find('td').length, 2);
  t.is(wrapper.find('Link').length, 1);
  t.is(wrapper.find('button').length, 1);
  const button = wrapper.find('button');
  t.is(button.length, 1);
  button.shallow().simulate('click');
  t.true(removeCustomer.calledWith(1));
});

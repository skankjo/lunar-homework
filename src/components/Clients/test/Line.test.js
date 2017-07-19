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
  t.is(wrapper.find('Link').length, 1);
  t.is(wrapper.find('Button').length, 1);
  const button = wrapper.find('Button');
  button.shallow().simulate('click');
  t.true(removeCustomer.calledWith(1));
});

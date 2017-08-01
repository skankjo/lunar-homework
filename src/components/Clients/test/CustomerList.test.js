import test from 'ava';
import React from 'react';
import { fromJS, Map } from 'immutable';
import { shallow } from 'enzyme';
import CustomerList from '../CustomerList';

test('Outputs customer list', (t) => {
  const plainCustomers = [
    {
      id: '1a',
      fullname: 'aaa',
    },
    {
      id: '2b',
      fullname: 'bbb',
    },
  ];

  const pairs = plainCustomers.map(customer => [customer.id, fromJS(customer)]);
  const customers = new Map(pairs);

  const wrapper = shallow(
    <CustomerList customers={customers} removeCustomer={() => {}} />, //eslint-disable-line
  );

  t.is(customers.size, 2);
  t.is(wrapper.find('Line').length, 2);
});

import test from 'ava';
import React from 'react';
import { fromJS, List } from 'immutable';
import { shallow } from 'enzyme';
import CustomerList from '../CustomerList';

test('Outputs customer list', (t) => {
  const customers = List.of(
    fromJS({
      id: 1,
      fullname: 'aaa',
    }),
    fromJS({
      id: 2,
      fullname: 'bbb',
    }),
  );

  const wrapper = shallow(
    <CustomerList customers={customers} removeCustomer={() => {}} />, //eslint-disable-line
  );

  t.is(customers.size, 2);
  t.is(wrapper.find('Line').length, 2);
  const tableHeaders = wrapper.find('th');
  t.is(tableHeaders.length, 2);
  t.is(tableHeaders.first().render().text(), 'Name:');
});

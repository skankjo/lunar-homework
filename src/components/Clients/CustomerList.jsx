import IPT from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'semantic-ui-react';
import Line from './Line';

const CustomerList = ({ customers, removeCustomer }) => (
  <List divided verticalAlign="middle">
    {customers.toArray().map(customer => (
      <Line key={customer.get('id')} customer={customer} removeCustomer={removeCustomer} />
    ))}
  </List>
);

CustomerList.propTypes = {
  customers: IPT.map.isRequired,
  removeCustomer: PropTypes.func.isRequired,
};

export default CustomerList;

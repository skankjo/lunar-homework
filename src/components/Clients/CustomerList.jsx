import IPT from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import Line from './Line';

const CustomerList = ({ customers, removeCustomer }) => (
  <table>
    <thead>
      <tr>
        <th>Name:</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {customers.map(customer => (
        <Line key={customer.get('id')} customer={customer} removeCustomer={removeCustomer} />
      ))}
    </tbody>
  </table>
);

CustomerList.propTypes = {
  customers: IPT.list.isRequired,
  removeCustomer: PropTypes.func.isRequired,
};

export default CustomerList;

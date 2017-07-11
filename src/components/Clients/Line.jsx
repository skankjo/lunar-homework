import IPT from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ClearIcon from './Clear.icon';

const Line = ({ customer, removeCustomer }) => (
  <tr>
    <td><Link to={`/client/${customer.get('id')}`}>{customer.get('fullname')}</Link></td>
    <td><button className="removeButton" onClick={() => removeCustomer(customer.get('id'))}><ClearIcon /></button></td>
  </tr>
);

Line.propTypes = {
  removeCustomer: PropTypes.func.isRequired,
  customer: IPT.map.isRequired,
};

export default Line;

import IPT from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';

const Line = ({ customer, removeCustomer }) => (
  <List.Item>
    <List.Content floated="right">
      <Button onClick={() => removeCustomer(customer.get('id'))} primary>Remove</Button>
    </List.Content>
    <List.Content>
      <Link to={`/client/${customer.get('id')}`}>{customer.get('fullname')}</Link>
    </List.Content>
  </List.Item>
);

Line.propTypes = {
  removeCustomer: PropTypes.func.isRequired,
  customer: IPT.map.isRequired,
};

export default Line;

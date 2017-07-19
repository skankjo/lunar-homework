import IPT from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import fetchCustomers from '../../actions/clients';
import { deleteCustomer } from '../../actions/client';
import CustomerList from './CustomerList';

export class Clients extends React.Component {

  componentDidMount() {
    const { getCustomers } = this.props;
    getCustomers();
  }

  render() {
    const { clients, removeCustomer } = this.props;
    return (
      <div>
        <Dimmer.Dimmable as={Segment} blurring dimmed={clients.get('pending')}>
          <Dimmer inverted active={clients.get('pending')}>
            <Loader />
          </Dimmer>
          <CustomerList customers={clients.get('customers')} removeCustomer={removeCustomer} />
        </Dimmer.Dimmable>
      </div>
    );
  }
}

Clients.propTypes = {
  clients: IPT.map.isRequired,
  getCustomers: PropTypes.func.isRequired,
  removeCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  clients: state.clients,
});

const mapDispatchToProps = dispatch => ({
  getCustomers: () => dispatch(fetchCustomers()),
  removeCustomer: id => dispatch(deleteCustomer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clients);

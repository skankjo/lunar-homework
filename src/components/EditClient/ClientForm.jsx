import IPT from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { both, complement, filter, isEmpty, map, mapObjIndexed, pipe, prop } from 'ramda';
import { connect } from 'react-redux';
import { Form, Message, Segment } from 'semantic-ui-react';
import { fromJS } from 'immutable';
import { withRouter, Redirect } from 'react-router-dom';
import { saveCustomer } from '../../actions/client';
import validate from '../../validation';

const convert = (value, key) => ({
  value,
  errors: [],
});

const isNotEmpty = complement(isEmpty);

const isNotValid = pipe(prop('errors'), isNotEmpty);

const passesValidation = pipe(filter(isNotValid), isEmpty);

class ClientForm extends Component {
  constructor() {
    super();
    this.state = {
      id: {
        value: '',
        errors: [],
      },
      fullname: {
        value: '',
        errors: [],
      },
      email: {
        value: '',
        errors: [],
      },
      city: {
        value: '',
        errors: [],
      },
      street: {
        value: '',
        errors: [],
      },
      housenumber: {
        value: '',
        errors: [],
      },
      zip: {
        value: '',
        errors: [],
      },
    };
  }

  componentDidMount() {
    const { clients, match: { params: { id } } } = this.props;
    this.setState(
      this.convertToState(clients.get('customers').get(id, fromJS(this.state)).toJSON()),
    );
  }

  convertToState(customer) {
    return mapObjIndexed(convert, customer);
  }

  convertToCustomer(state) {
    return map(value => value.value, state);
  }

  @autobind
  handleChange(e, { name, value }) {
    this.setState({ [name]: {
      value,
      errors: [],
    } }, this.validateForm);
  }

  @autobind
  handleSubmit(e) {
    const { saveCustomer } = this.props;
    this.validateForm(this.checksValidityOrPersistsCustomer);
  }

  checksValidityOrPersistsCustomer() {
    const { saveCustomer } = this.props;
    both(passesValidation, pipe(this.convertToCustomer, saveCustomer))(this.state);
  }

  validateForm(callback = () => {}) {
    this.setState(validate('client', this.state), callback);
  }

  render() {
    const { id, fullname, email, city, street, housenumber, zip } = this.state;
    const { clients, address } = this.props;

    return (
      <Form as={Segment} error={address.get('errorMessage')} success={clients.get('savedCustomer')} loading={clients.get('pending')}>
        <Message success header="Save complete" content="A customer data saved successfully" />
        <Message error header="Error while saving customer data" content={address.get('errorMessage')} />
        <input name="id" type="hidden" value={id.value} />
        <Form.Input name="fullname" label="Name" value={fullname.value} error={isNotEmpty(fullname.errors)} width={4} required onChange={this.handleChange} />
        <Form.Input name="email" label="Email" value={email.value} error={isNotEmpty(email.errors)} width={4} required onChange={this.handleChange} />
        <Form.Input name="city" label="City" value={city.value} error={isNotEmpty(city.errors)} width={4} required onChange={this.handleChange} />
        <Form.Input name="street" label="Street" value={street.value} error={isNotEmpty(street.errors)} width={4} required onChange={this.handleChange} />
        <Form.Input name="housenumber" label="House Number" value={housenumber.value} error={isNotEmpty(housenumber.errors)} width={4} required onChange={this.handleChange} />
        <Form.Input name="zip" label="Zip" value={zip.value} error={isNotEmpty(zip.errors)} width={4} onChange={this.handleChange} />
        <Form.Button content="Submit" onClick={this.handleSubmit} />
      </Form>
    );
  }
}

ClientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  saveCustomer: PropTypes.func.isRequired,
  clients: IPT.map.isRequired,
  address: IPT.map.isRequired,
};

ClientForm.defaultProps = {
  match: {},
};

const mapStateToProps = state => ({
  clients: state.clients,
  address: state.address,
});

const mapDispatchToProps = dispatch => ({
  saveCustomer: customer => dispatch(saveCustomer(customer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);


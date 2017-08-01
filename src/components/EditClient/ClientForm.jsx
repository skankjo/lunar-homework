import IPT from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { addIndex, both, complement, filter, isEmpty, map, mapObjIndexed, pick, pipe, prop } from 'ramda';
import { connect } from 'react-redux';
import { Form, Message, Segment } from 'semantic-ui-react';
import { fromJS } from 'immutable';
import { withRouter, Redirect } from 'react-router-dom';
import { resetAddressValidation, validateAddress } from '../../actions/validateAddress';
import { saveCustomer } from '../../actions/client';
import AddressSelector from './AddressSelector';
import TextField from './TextField';
import validate from '../../validation';

const convert = (value, key) => ({
  value,
  errors: [],
});

const noop = () => {};

const isNotEmpty = complement(isEmpty);

const isNotValid = pipe(prop('errors'), isNotEmpty);

const passesValidation = pipe(filter(isNotValid), isEmpty);

const mapIndexed = addIndex(map);

export class ClientForm extends Component {
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

    this.emptyCustomer = {
      id: '',
      fullname: '',
      email: '',
      city: '',
      street: '',
      housenumber: '',
      zip: '',
    };
  }

  componentDidMount() {
    const { clients, match: { params: { id } } } = this.props;
    this.setState(
      this.convertToState(clients.get('customers').get(id, fromJS(this.emptyCustomer)).toJSON()),
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

  @autobind
  selectAddress(e, index) {
    e.preventDefault();
    const { address } = this.props;
    const selected = pick(['city', 'street', 'housenumber', 'zip'], address.get('addresses').get(index));
    this.setState(this.convertToState(selected));
  }

  checksValidityOrPersistsCustomer() {
    const { address, resetAddressValidation, saveCustomer, validateAddress } = this.props;
    const existAddresses = address.get('addresses').size > 0;
    const fn = existAddresses ? pipe(saveCustomer, resetAddressValidation) : validateAddress;
    both(passesValidation, pipe(this.convertToCustomer, fn))(this.state);
  }

  validateForm(callback = noop) {
    this.setState(validate('client', this.state), callback);
  }

  displayErrors(arr) {
    return arr.join(', ');
  }

  render() {
    const { id, fullname, email, city, street, housenumber, zip } = this.state;
    const { clients, address } = this.props;
    const addresses = address.get('addresses');
    const width = 4;

    return (
      <Form as={Segment} error={!address.get('valid')} success={clients.get('savedCustomer')} loading={clients.get('pending')}>
        <Message success header="Save complete" content="A customer data saved successfully" />
        <Message error header="Error while saving customer data" content={address.get('errorMessage')} />
        <input name="id" type="hidden" value={id.value} />
        <AddressSelector addresses={addresses} visible={addresses.size > 0} onClick={this.selectAddress} header="Select your address" />
        <TextField name="fullname" label="Name" value={fullname.value} error={isNotEmpty(fullname.errors)} errorMessage={this.displayErrors(fullname.errors)} width={width} required={true} onChange={this.handleChange} />
        <TextField name="email" label="Email" value={email.value} error={isNotEmpty(email.errors)} errorMessage={this.displayErrors(email.errors)} width={width} required={true} onChange={this.handleChange} />
        <TextField name="city" label="City" value={city.value} error={isNotEmpty(city.errors)} errorMessage={this.displayErrors(city.errors)} width={width} required={true} onChange={this.handleChange} />
        <TextField name="street" label="Street" value={street.value} error={isNotEmpty(street.errors)} errorMessage={this.displayErrors(street.errors)} width={width} required={true} onChange={this.handleChange} />
        <TextField name="housenumber" label="Housenumber" value={housenumber.value} error={isNotEmpty(housenumber.errors)} errorMessage={this.displayErrors(housenumber.errors)} width={width} required={true} onChange={this.handleChange} />
        <TextField name="zip" label="Zip" value={zip.value} error={isNotEmpty(zip.errors)} errorMessage={this.displayErrors(zip.errors)} width={width} required={true} onChange={this.handleChange} />
        <Form.Button id="submit" content="Submit" onClick={this.handleSubmit} />
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
  resetAddressValidation: () => dispatch(resetAddressValidation()),
  validateAddress: customer => dispatch(validateAddress(customer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);


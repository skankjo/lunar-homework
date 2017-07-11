import IPT from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-form';
import { fromJS } from 'immutable';
import { withRouter, Redirect } from 'react-router-dom';
import { saveCustomer } from '../../actions/client';
import HiddenField from './HiddenField';
import TextField from './TextField';

const validateForm = (values) => {
  const validationResults = fromJS(values)
    .map((value, key) => { return !value && key !== 'zip' ? `${key} is required.` : undefined; }); // eslint-disable-line arrow-body-style
  return validationResults.toJSON();
};

export const EditClient = ({
  match: { params: { id } },
  saveCustomer: putCustomer,
  clients,
  address }) => (
    <Form
      onSubmit={(values) => { putCustomer(values); }}
      defaultValues={clients.get('customers').get(id, fromJS({ fullname: '', email: '', city: '', street: '', housenumber: '' })).toJSON()}
      validate={validateForm}
    >
      {({ submitForm }) => { // eslint-disable-line arrow-body-style
        return (
          <div>
            {clients.get('savedCustomer') && <Redirect to="/clients" />}
            {clients.get('pending') && <div>Pending...</div>}
            <form onSubmit={submitForm}>
              <HiddenField name="id" />
              <TextField name="fullname" title="Full name:" />
              <TextField name="email" title="Email:" />
              <fieldset>
                <legend>Address:</legend>
                {address.get('errorMessage') && <div className="error">{address.get('errorMessage')}</div>}
                <TextField name="city" title="City:" />
                <TextField name="street" title="Street:" />
                <TextField name="housenumber" title="House number:" />
                <TextField name="zip" title="Zip Code:" />
              </fieldset>
              <button className="submit" type="submit">Submit</button>
            </form>
          </div>
        );
      }}
    </Form>
);

EditClient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  saveCustomer: PropTypes.func.isRequired,
  clients: IPT.map.isRequired,
  address: IPT.map.isRequired,
};

EditClient.defaultProps = {
  match: {},
};

const mapStateToProps = state => ({
  clients: state.clients,
  address: state.address,
});

const mapDispatchToProps = dispatch => ({
  saveCustomer: customer => dispatch(saveCustomer(customer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditClient));

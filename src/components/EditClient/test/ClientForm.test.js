import test from 'ava';
import React from 'react';
import sinon from 'sinon';
// import util from 'util';
import { fromJS, Map } from 'immutable';
import { mount } from 'enzyme';
import { ClientForm } from '../ClientForm';

test('should display validation errors', (t) => {
  const match = {
    params: {},
  };
  const saveCustomer = sinon.spy();
  const clients = fromJS({
    customers: Map(),
    pending: false,
  });
  const address = Map();

  const wrapper = mount(
    <ClientForm // eslint-disable-line react/jsx-filename-extension
      match={match}
      saveCustomer={saveCustomer}
      clients={clients}
      address={address}
    />,
  );
  const submit = wrapper.find('#submit');
  t.is(submit.length, 1);
  submit.simulate('click');
  const errorMessages = wrapper.find('.error-message');
  t.is(errorMessages.length, 5);
  t.is(errorMessages.filterWhere(el => el.text() === 'The field is required').length, 4);
  t.is(errorMessages.at(1).text(), 'The field is required, The field should contain valid email address');

  t.is(saveCustomer.notCalled, true);

  const form = wrapper.find('Form');
  t.is(form.length, 1);
  t.is(form.props().loading, false);
});

test('should save customer on successful validation of the form', (t) => {
  const match = {
    params: {
      id: 'aaa',
    },
  };
  const saveCustomer = sinon.spy();
  const clients = fromJS({
    customers: fromJS({
      aaa: {
        id: 'aaa',
        fullname: 'Linas',
        email: 'aaa@aaa.lt',
        city: 'Vilnius',
        street: 'Gedimino pr.',
        housenumber: '1',
      },
    }),
    savedCustomer: true,
    pending: false,
  });
  const address = Map();

  const wrapper = mount(
    <ClientForm // eslint-disable-line react/jsx-filename-extension
      match={match}
      saveCustomer={saveCustomer}
      clients={clients}
      address={address}
    />,
  );

  const hidden = wrapper.find('input[type="hidden"]');
  t.is(hidden.length, 1);
  t.is(hidden.prop('value'), 'aaa');

  const fullname = wrapper.find('input[name="fullname"]');
  t.is(fullname.length, 1);
  t.is(fullname.prop('value'), 'Linas');

  const submit = wrapper.find('#submit');
  t.is(submit.length, 1);
  submit.simulate('click');

  const errorMessages = wrapper.find('.error-message');
  t.is(errorMessages.length, 0);

  t.is(saveCustomer.called, true);

  const successMessage = wrapper.find('Message').filterWhere(el => el.prop('success') === true);
  t.is(successMessage.length, 1);
  t.is(successMessage.prop('header'), 'Save complete');
  t.is(successMessage.prop('content'), 'A customer data saved successfully');
});

test('should display an error while saving customer data', (t) => {
  const match = {
    params: {},
  };
  const saveCustomer = sinon.spy();
  const clients = fromJS({
    customers: Map(),
    savedCustomer: false,
  });
  const address = fromJS({
    valid: false,
    errorMessage: 'Error message',
  });

  const wrapper = mount(
    <ClientForm // eslint-disable-line react/jsx-filename-extension
      match={match}
      saveCustomer={saveCustomer}
      clients={clients}
      address={address}
    />,
  );

  const form = wrapper.find('Form');
  t.is(form.length, 1);
  t.is(form.prop('error'), true);

  const errorMessage = wrapper.find('Message').filterWhere(el => el.prop('error') === true);
  t.is(errorMessage.length, 1);
  t.is(errorMessage.prop('header'), 'Error while saving customer data');
  t.is(errorMessage.prop('content'), 'Error message');
});

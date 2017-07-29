import formUrlencode from 'form-urlencoded';
import { complement, either, ifElse, isEmpty, isNil, pipe, prop } from 'ramda';
import config from '../config';
import validateAddress from './validateAddress';
import { customerToJson } from '../utils/customerMapper';
import addStateSuffixes from '../utils/addStateSuffixes';

export const actions = addStateSuffixes(['SAVE_CUSTOMER', 'DELETE_CUSTOMER']);

function postCustomer(customer, url) {
  const headers = new Headers(); // eslint-disable-line no-undef
  headers.append('Authorization', `Bearer ${config.stripe.key}`);
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const options = {
    method: 'POST',
    headers,
    body: formUrlencode(customerToJson(customer)),
  };
  return fetch(url, options); // eslint-disable-line no-undef
}

function createCustomer(customer) {
  return postCustomer(customer, `${config.stripe.baseUrl}customers`);
}

function updateCustomer(customer) {
  return postCustomer(customer, `${config.stripe.baseUrl}customers/${customer.id}`);
}

const isNilOrEmpty = either(isNil, isEmpty);
const isNeitherNilNorEmpty = complement(isNilOrEmpty);
const hasId = pipe(prop('id'), isNeitherNilNorEmpty);
const save = ifElse(hasId, updateCustomer, createCustomer);

export function saveCustomer(customer) {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      dispatch(validateAddress(customer)).then(() => {
        const validatedAddress = getState().address.get('validatedAddress');
        const validCustomer = { ...customer, ...validatedAddress.toJS() };
        return save(validCustomer);
      })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
    });

    return dispatch({
      type: actions.SAVE_CUSTOMER,
      payload: promise,
    });
  };
}

export function deleteCustomer(id) {
  return (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      const headers = new Headers(); // eslint-disable-line no-undef
      headers.append('Authorization', `Bearer ${config.stripe.key}`);

      const options = {
        method: 'DELETE',
        headers,
      };

      fetch(`${config.stripe.baseUrl}customers/${id}`, options) // eslint-disable-line no-undef
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
    });

    return dispatch({
      type: actions.DELETE_CUSTOMER,
      payload: promise,
    });
  };
}

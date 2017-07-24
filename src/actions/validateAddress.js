import { List, Map } from 'immutable';
import config from '../config';

export const ADDRESS_VALIDATION_REJECTED = 'ADDRESS_VALIDATION_REJECTED';
export const ADDRESS_VALIDATION_FULFILLED = 'ADDRESS_VALIDATION_FULFILLED';
export const ADDRESS_VALIDATION_PENDING = 'ADDRESS_VALIDATION_PENDING';

const addressComponentMapper = {
  locality: 'city',
  route: 'street',
  street_number: 'housenumber',
  postal_code: 'zip',
};

function mapAddressComponent(component) {
  const types = component.types.filter(type => addressComponentMapper[type]);
  if (types.length > 0) {
    return [addressComponentMapper[types.shift()], component.short_name];
  }
  return null;
}

function checkResponse(resolve, reject, customer, response) {
  if (response.status === 'OK') {
    if (response.results.length > 1) {
      return reject({ errorMessage: 'Too many variants of address by provided data of yours. Please, specify your address more precisely' });
    }
    const address = response.results.shift().address_components.reduce((previous, current) => {
      const mapped = mapAddressComponent(current);
      if (mapped) {
        return previous.push(mapped);
      }
      return previous;
    }, List());
    const validatedAddress = Map(address);
    if (validatedAddress.size < 4) {
      reject({
        errorMessage: 'Not enough data to find exact address',
      });
    }
    // TODO: ask a client if he confirms this address
    // const submittedAddress = customerToAddress(customer);
    // if (!is(validatedAddress, submittedAddress)) {
    //   reject({
    //     errorMessage: 'The address you specified
    // does not match the address found by your description.',
    //     validatedAddress,
    //   });
    // }
    return resolve({ validatedAddress });
  } else if (response.status === 'ZERO_RESULTS') {
    reject({ errorMessage: 'No address found' });
  }
  return reject({ errorMessage: response.error_message });
}

export default function validateAddress(customer) {
  return (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      const { city, street, housenumber, zip } = customer;
      const address = [city, street, housenumber, zip].reduce((acc, item) => (item ? `${acc}${item},` : acc), '');

      fetch(`${config.geocode.baseUrl}?address=${address}&key=${config.geocode.key}`) // eslint-disable-line no-undef
        .then(response => response.json())
        .then(json => checkResponse(resolve, reject, customer, json))
        .catch(err => reject({ errorMessage: err.message }));
    });
    return dispatch({
      type: 'ADDRESS_VALIDATION',
      payload: promise,
    });
  };
}

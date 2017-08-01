import Either from 'data.either';
import { curry, map, merge, pick, pipe, prop, propOr } from 'ramda';
import config from '../config';
import addStateSuffixes from '../utils/addStateSuffixes';
import mapAddress from '../utils/mapAddress';

export const actions = addStateSuffixes(['ADDRESS_VALIDATION', 'ADDRESS_VALIDATION_RESET']);

const processResponse = response => (response.status === 'OK' ?
                                    Either.of(response.results) :
                                    Either.Left(propOr(response.status, 'error_message', response)));

const mergeProcessedFn = (fn1, fn2, o) => merge(fn1(o), fn2(o));
const mergeProcessed = curry(mergeProcessedFn);
const getFormattedAddressEntry = pick(['formatted_address']);
const mapAddressComponents = pipe(prop('address_components'), mapAddress);
const convert = map(mergeProcessed(mapAddressComponents, getFormattedAddressEntry));
const buildAddresses = map(convert);

function checkResponse(resolve, reject, customer, response) {
  const addresses = pipe(processResponse, buildAddresses)(response);
  addresses.chain(resolve).orElse(reject);
}

export function validateAddress(customer) {
  return (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      const { city, street, housenumber, zip } = customer;
      const address = [city, street, housenumber, zip].join(',');

      fetch(`${config.geocode.baseUrl}?address=${address}&key=${config.geocode.key}`) // eslint-disable-line no-undef
        .then(response => response.json())
        .then(json => checkResponse(resolve, reject, customer, json))
        .catch(err => reject({ errorMessage: err.message }));
    });
    return dispatch({
      type: actions.ADDRESS_VALIDATION,
      payload: promise,
    });
  };
}

export function resetAddressValidation() {
  return dispatch =>
    dispatch({
      type: actions.ADDRESS_VALIDATION_RESET,
    });
}

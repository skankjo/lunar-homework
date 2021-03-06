import config from '../config';
import { jsonToCustomer } from '../utils/customerMapper';
import addStateSuffixes from '../utils/addStateSuffixes';

export const actions = addStateSuffixes(['FETCH_CUSTOMERS']);

function mapCustomers(json) {
  return json.data.map(data => jsonToCustomer(data));
}

export default function fetchCustomers() {
  return (dispatch) => {
    const promise = new Promise((resolve) => {
      const headers = new Headers(); // eslint-disable-line no-undef
      headers.append('Authorization', `Bearer ${config.stripe.key}`);
      const options = {
        method: 'GET',
        headers,
      };
      fetch(`${config.stripe.baseUrl}customers`, options) // eslint-disable-line no-undef
        .then(response => response.json())
        .then(json => resolve(mapCustomers(json)));
    });

    return dispatch({
      type: actions.FETCH_CUSTOMERS,
      payload: promise,
    });
  };
}

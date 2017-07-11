import config from '../config';
import { jsonToCustomer } from '../utils/customerMapper';

function mapCustomers(json) {
  return json.data.map(data => jsonToCustomer(data));
}

export function fetchCustomers() {
  return (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${config.stripe.key}`);
      const options = {
        method: 'GET',
        headers,
      };
      fetch(`${config.stripe.baseUrl}customers`, options)
        .then(response => response.json())
        .then(json => resolve(mapCustomers(json)));
    });

    return dispatch({
      type: 'FETCH_CUSTOMERS',
      payload: promise,
    });
  };
}

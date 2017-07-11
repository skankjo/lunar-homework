import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import clients from './clients';
import address from './address-validation';

export default combineReducers({
  router: routerReducer,
  clients,
  address,
});

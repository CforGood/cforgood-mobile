import { combineReducers } from 'redux';

import nav from './nav';
import auth from './auth';
import business from './business';
import association from './association';
import review from './review';
import filters from './filters';
import user from './user';
import location from './location';
import offer from './offer';
import popup from './popup';

export default combineReducers({
  nav,
  auth,
  business,
  association,
  review,
  filters,
  user,
  offer,
  location,
  popup
});

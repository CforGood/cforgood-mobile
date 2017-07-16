import {
  UPDATE_NEARME,
  NO_PERMISSION_LOCATION,
  CHECK_LOCATION,
} from '../constants/popup.js';

const initialState = {
  nearme: true,
  no_permission_location: false,
  check_location: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    
    case UPDATE_NEARME:
      return {
        ...state,
        nearme: action.nearme,
      };
    case NO_PERMISSION_LOCATION:
      return {
        ...state,
        no_permission_location: true,
      };
    case CHECK_LOCATION:
      return {
        ...state,
        check_location: action.check,
      };
    
    default:
      return state;
  }
}

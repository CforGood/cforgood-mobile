import {
  UPDATE,
} from '../constants/user.js';

const initialState = {
  latlng: {latitude: 44.8150852, longitude: -0.7824325},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    
    case UPDATE:
      return {
        ...state,
        latlng: action.location,
      };
    default:
      return state;
  }
}

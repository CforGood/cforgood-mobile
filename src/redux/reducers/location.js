import {
  UPDATE,
} from '../constants/user.js';

const initialState = {
  latlng: {latitude: 44.8450097, longitude: -0.5785995},
  changed: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    
    case UPDATE:
      return {
        ...state,
        latlng: action.location,
        changed: true,
      };
    default:
      return state;
  }
}

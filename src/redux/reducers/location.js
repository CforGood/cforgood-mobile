import {
  UPDATE,
} from '../constants/user.js';

const initialState = {
  latlng: {latitude: 44.840412, longitude: -0.5703524},
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

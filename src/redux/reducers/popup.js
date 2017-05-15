import {
  UPDATE_NEARME,
} from '../constants/popup.js';

const initialState = {
  nearme: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    
    case UPDATE_NEARME:
      return {
        ...state,
        nearme: action.nearme,
      };
    default:
      return state;
  }
}

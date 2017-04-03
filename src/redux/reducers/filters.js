import {
  UPDATE,
  RESET,
} from '../constants/filters.js';

const initialState = {
  categories: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        categories: action.categories,
      };
    case RESET: {
      return {
        ...state,
        categories: [],
      };
    }

    default:
      return state;
  }
}
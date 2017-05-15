import {
  UPDATE,
  RESET,
  UPDATEPERKS,
} from '../constants/filters.js';

const initialState = {
  categories: [],
  categoriesPerks: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        categories: action.categories,
      };
    case UPDATEPERKS:
      return {
        ...state,
        categoriesPerks: action.categories,
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
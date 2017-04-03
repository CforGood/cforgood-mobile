import {
  NEW,
  CLOSE,
} from '../constants/offer.js';

const initialState = {
  perk: null,
  business: null,
  category: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NEW:
      return {
        ...state,
        perk: action.perk,
        business: action.business,
        category: action.category,
      };
    case CLOSE: {
      return {
        ...state,
        perk: null,
        business: null,
        use: null
      };
    }
    default:
      return state;
  }
}
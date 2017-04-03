import {
  REVIEW,
  REVIEW_SAVE,
  REVIEW_CANCEL,
} from '../constants/review.js';

const initialState = {
  perk: null,
  business: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REVIEW:
      return {
        ...state,
        perk: action.perk,
        business: action.business,
        use: action.use,
      };
    case REVIEW_SAVE || REVIEW_CANCEL: {
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
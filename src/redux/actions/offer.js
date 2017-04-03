import ApiHandler from '../../utils/api';

import {
  CLOSE,
  NEW,
} from '../constants/offer';



export const newOffer = (perk, business, category) => {
  return {
    type: NEW,
    perk,
    business,
    category
  };
}


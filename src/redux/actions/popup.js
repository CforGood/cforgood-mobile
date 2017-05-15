
import {
  UPDATE_NEARME,
} from '../constants/popup';


export const loadPopupNearMe = (nearme) => {
  return {
    type: UPDATE_NEARME,
    nearme
  };
}
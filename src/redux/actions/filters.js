
import {
  UPDATE,
  RESET,
  UPDATEPERKS,
} from '../constants/filters';


export const filter = (categories, type) => {
  return {
    type: type== 'maps' ? UPDATE : UPDATEPERKS,
    categories
  };
}
  


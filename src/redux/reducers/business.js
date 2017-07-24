import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  FILTER,
  SHOW,
  LOAD_PERK_SUCCESS,
  LOAD_PERK_FAIL,
} from '../constants/business.js';

const initialState = {
  failed: false,
  loaded: true,
  loading: false,
  entities: [],
  entities_perk: [],
  businessId: null

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: false,
        failed: false,
      };
    case LOAD_SUCCESS: {
      const entities = action.entities;
      return {
        ...state,
        loaded: true,
        failed: false,
        entities,
      };
    }
    case LOAD_PERK_SUCCESS: {
      const entities = action.entities;
      return {
        ...state,
        entities_perk: entities,
      };
    }
    case FILTER: {
      const entities = action.entities;
      return {
        ...state,
        entities,
      };
    }
    case LOAD_FAIL:
      return {
        ...state,
        loaded: true,
        failed: true,
        error: action.error,
      };
    case LOAD_PERK_FAIL:
      return {
        ...state,
        failed: true,
        error: action.error,
      };
    case SHOW:
      return {
        ...state,
        businessId: action.id,
      };
    default:
      return state;
  }
}
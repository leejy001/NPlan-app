import { SET_SEARCH, SET_PLAN } from "../types";

const initialPlanState = {
  currentplan: null,
  currentLevel: "all",
};

export default function planReducer(state = initialPlanState, action) {
  switch (action.type) {
    case SET_PLAN:
      return {
        ...state,
        currentplan: action.payload,
      };
    case SET_SEARCH:
      return {
        ...state,
        currentLevel: action.payload,
      };
    default:
      return state;
  }
}

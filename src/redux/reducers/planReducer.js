import { CLEAR_PLAN, SET_PLAN } from "../types";

const initialPlanState = {
  currentplan: null,
};
export default function (state = initialPlanState, action) {
  switch (action.type) {
    case SET_PLAN:
      return {
        ...state,
        currentplan: action.payload,
      };
    case CLEAR_PLAN:
      return {
        ...state,
        currentplan: null,
      };
    default:
      return state;
  }
}

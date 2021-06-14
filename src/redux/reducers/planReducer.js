import { SET_PLAN } from "../types";

const initialState = {
  plan: null,
  isLoading: true,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAN:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

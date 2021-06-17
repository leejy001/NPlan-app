import { CLEAR_PLAN, SET_PLAN } from "../types";

export const setPlan = (plan) => {
  return {
    type: SET_PLAN,
    payload: plan,
  };
};

export const clearPlan = () => {
  return {
    type: CLEAR_PLAN,
  };
};

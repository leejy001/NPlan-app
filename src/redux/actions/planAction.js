import { SET_PLAN } from "../types";

export const setPlan = (plan) => {
  return {
    type: SET_PLAN,
    payload: plan,
  };
};

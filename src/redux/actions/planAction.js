import { SET_SEARCH, SET_PLAN } from "../types";

export const setPlan = (plan) => {
  return {
    type: SET_PLAN,
    payload: plan,
  };
};

export const setSearch = (level) => {
  return {
    type: SET_SEARCH,
    payload: level,
  };
};

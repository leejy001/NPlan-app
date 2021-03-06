import { SET_USER, CLEAR_USER, SET_PHOTO_URL } from "../types";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const setPhotoURL = (photoURL) => {
  return {
    type: SET_PHOTO_URL,
    payload: photoURL,
  };
};

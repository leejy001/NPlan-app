import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./redux/actions/userAction";
import AppRouter from "./Router";

const App = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
        dispatch(setUser(user));
        setIsLoggedIn(true);
      } else {
        history.push("/login");
        dispatch(clearUser());
        setIsLoggedIn(false);
      }
    });
  }, [dispatch, history]);

  return (
    <>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <AppRouter isLoggedIn={isLoggedIn} />
      )}
    </>
  );
};

export default App;

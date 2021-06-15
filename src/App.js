import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./redux/actions/userAction";
import AppRouter from "./Router";

const App = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const [userUid, setUserUid] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
        dispatch(setUser(user));
        setUserUid(user.uid);
        setIsLoggedIn(true);
      } else {
        history.push("/login");
        dispatch(clearUser());
        setUserUid(null);
        setIsLoggedIn(false);
      }
    });
  }, [dispatch, history]);

  return (
    <>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <AppRouter userUid={userUid} isLoggedIn={isLoggedIn} />
      )}
    </>
  );
};

export default App;

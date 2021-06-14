import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import { authService } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./redux/actions/userAction";

const App = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
        dispatch(setUser(user));
      } else {
        history.push("/login");
        dispatch(clearUser());
      }
    });
  }, [dispatch, history]);

  if (isLoading) {
    return <div>...loading</div>;
  } else {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    );
  }
};

export default App;

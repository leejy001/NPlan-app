import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";

const AppRouter = ({ userUid, isLoggedIn }) => {
  return (
    <Switch>
      {isLoggedIn ? (
        <>
          <Route exact path="/">
            <MainPage userUid={userUid} />
          </Route>
        </>
      ) : (
        <>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </>
      )}
    </Switch>
  );
};

export default AppRouter;

import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import PlanPage from "./components/Pages/PlanPage";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Switch>
      {isLoggedIn ? (
        <>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/plan/:id" component={PlanPage} />
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

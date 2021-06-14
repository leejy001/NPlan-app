import React from "react";
import AppNavbar from "../AppNavbar";
import CardList from "../CardList";
import Footer from "../Footer";
import Header from "../Header";

const MainPage = () => {
  return (
    <>
      <AppNavbar />
      <Header />
      <CardList />
      <Footer />
    </>
  );
};

export default MainPage;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { dbService } from "../../firebase";
import "../form.css";
import CardPanel from "../Panel/CardPanel";
import AppNavbar from "../AppNavbar";
import Footer from "../Footer";
import Header from "../Header";

const MainPage = () => {
  const [plans, setPlans] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dbService
      .collection("plans")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const planArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimeout(() => {
          setPlans(planArray);
        }, 200);
      });
  }, []);

  const CardList = (
    <div id="main-body">
      <div className="plan-container">
        {plans
          .filter((plan) => {
            if (searchTerm === "") {
              return plan;
            } else if (
              plan.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return plan;
            }
          })
          .map((plan, index) => (
            <CardPanel
              key={plan.id}
              index={index}
              planObj={plan}
              isOwner={plan.createBy.id === user.uid}
            />
          ))}
      </div>
    </div>
  );

  return (
    <>
      <AppNavbar onSearchChange={onSearchChange} />
      <Header />
      {CardList}
      <Footer />
    </>
  );
};

export default MainPage;

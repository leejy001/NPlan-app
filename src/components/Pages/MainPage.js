import React, { useState, useEffect } from "react";
import { dbService } from "../../firebase";
import "../form.css";
import CardPanel from "../Panel/CardPanel";
import AppNavbar from "../AppNavbar";
import Footer from "../Footer";
import Header from "../Header";
import { useSelector } from "react-redux";

const MainPage = () => {
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  console.log(user.uid, "uid");

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dbService
      .collection("users")
      .doc(user.uid)
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
  }, [user.uid]);

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
            return false;
          })
          .map((plan, index) => (
            <CardPanel key={plan.id} index={index} planObj={plan} />
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

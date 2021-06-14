import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { dbService } from "../firebase";
import "./form.css";
import CardPanel from "./Panel/CardPanel";

const CardList = () => {
  const [plans, setPlans] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

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

  return (
    <div id="main-body">
      <div className="plan-container">
        {plans.map((plan, index) => (
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
};

export default CardList;

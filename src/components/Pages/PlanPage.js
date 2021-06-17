import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { dbService } from "../../firebase";
import firebase from "firebase";
import SectionPanel from "../Panel/SectionPanel";

const PlanPage = () => {
  const user = useSelector((state) => state.user.currentUser);
  const plan = useSelector((state) => state.plan.currentplan);
  console.log(plan);
  const [searchTerm, setSearchTerm] = useState("");
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const planRef = dbService
    .collection("users")
    .doc(user.uid)
    .collection("plans")
    .doc(plan.id);

  const onShow = () => setShow(true);

  useEffect(() => {
    planRef.collection("sections").onSnapshot((snapshot) => {
      const sectionArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTimeout(() => {
        setSections(sectionArray);
      }, 200);
    });
  }, []);

  const addSection = async () => {
    const newSection = {
      sectionTitle: section,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      createrId: user.uid,
      createrName: user.displayName,
    };

    try {
      await planRef.collection("sections").add(newSection);
      // 초기화
      setSection("");
      setShow(false);
    } catch (error) {
      alert(error);
    }
  };

  const onSectionSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(section)) {
      addSection();
    }
  };

  const isFormValid = (section) => section;

  const goMain = () => {
    history.push("/");
  };

  const SectionList = (
    <div className="section-container">
      {sections
        .filter((section) => {
          if (searchTerm === "") {
            return plan;
          } else if (
            section.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return section;
          }
          return false;
        })
        .map((section, index) => (
          <SectionPanel key={section.id} index={index} planObj={section} />
        ))}
    </div>
  );

  return (
    <>
      <div className="header plan d-flex">
        <div onClick={goMain}>
          <h2 className="logo" style={{ padding: "15px" }}>
            N Plan
          </h2>
        </div>
        <h3 style={{ padding: "20px 0px" }}>{plan.title}</h3>
      </div>
      <div style={{ margin: "50px 70px" }}>
        {SectionList}
        <div className="add-section" style={{ width: "200px" }}>
          {show ? (
            <div>
              <Form onSubmit={onSectionSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>섹션 이름</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setSection(e.target.value)}
                    placeholder="섹션 입력"
                  />
                </Form.Group>
                <Button
                  onClick={onSectionSubmit}
                  variant="outline-primary"
                  style={{ width: "200px" }}
                >
                  섹션 추가
                </Button>
              </Form>
            </div>
          ) : (
            <Button
              onClick={onShow}
              variant="outline-primary"
              style={{ width: "200px" }}
            >
              To do 추가
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PlanPage;

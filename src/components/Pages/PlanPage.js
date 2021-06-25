import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { dbService } from "../../firebase";
import firebase from "firebase/app";
import "../form.css";
import SectionPanel from "../Panel/SectionPanel";

const PlanPage = () => {
  const user = useSelector((state) => state.user.currentUser);
  const plan = useSelector((state) => state.plan.currentplan);

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
  const onClose = () => setShow(false);

  const onSectionSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dbService
      .collection("users")
      .doc(user.uid)
      .collection("plans")
      .doc(plan.id)
      .collection("sections")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const sectionArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimeout(() => {
          setSections(sectionArray);
        }, 200);
      });
  }, [user.uid, plan.id]);

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
            return section;
          } else if (
            section.sectionTitle.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return section;
          }
          return false;
        })
        .map((section, index) => (
          <SectionPanel key={section.id} index={index} sectionObj={section} />
        ))}
    </div>
  );

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="header plan d-flex">
        <div onClick={goMain}>
          <h2 className="logo" style={{ padding: "15px" }}>
            N Plan
          </h2>
        </div>
        <h3 style={{ padding: "20px 0px" }}>{plan.title}</h3>
      </div>
      <div>
        <Form className="d-flex" style={{ marginRight: "20px" }}>
          <FormControl
            onChange={onSectionSearchChange}
            type="search"
            placeholder="Section Search..."
            aria-label="Search"
            style={{ marginLeft: "110px", marginTop: "20px", width:"300px" }}
          />
        </Form>
        <div
          style={{
            position: "absolute",
            left: "5%",
            right: "0%",
            display: "inline-flex",
            overflow: "auto",
            maxWidth: "95%",
            top: "140px",
            bottom: "0px",
          }}
        >
          {SectionList}
          <div
            className="add-section"
            style={{ width: "250px", position: "relative" }}
          >
            {show ? (
              <div style={{ width: "300px" }}>
                <Form
                  onSubmit={onSectionSubmit}
                  style={{ marginRight: "50px" }}
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>섹션 이름</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setSection(e.target.value)}
                      placeholder="섹션 입력"
                    />
                  </Form.Group>
                  <div>
                    <Button
                      onClick={onSectionSubmit}
                      variant="outline-primary"
                      style={{ width: "170px", float: "left" }}
                    >
                      섹션 추가
                    </Button>
                    <Button onClick={onClose} style={{ marginLeft: "22px" }}>
                      취소
                    </Button>
                  </div>
                </Form>
              </div>
            ) : (
              <Button
                onClick={onShow}
                variant="outline-primary"
                style={{ width: "250px", marginRight: "50px" }}
              >
                섹션 추가
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;

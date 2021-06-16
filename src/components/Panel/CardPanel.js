import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import firebase from "firebase/app";
import { dbService } from "../../firebase";
import "../form.css";
import { useSelector } from "react-redux";

const CardPanel = ({ index, planObj }) => {
  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState(planObj.title);
  const [newDescription, setNewDescription] = useState(planObj.description);
  const user = useSelector((state) => state.user.currentUser);
  const userRef = dbService.collection("users").doc(user.uid);

  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(newTitle, newDescription)) {
      editPlan();
    }
  };

  const editPlan = async () => {
    try {
      await userRef.collection("plans").doc(planObj.id).update({
        title: newTitle,
        description: newDescription,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // 초기화
      setNewTitle("");
      setNewDescription("");
      setShow(false);
    } catch (error) {
      alert(error);
    }
  };

  const isFormValid = (title, description) => title && description;

  const onDeleteClick = async () => {
    const ok = window.confirm("계획을 삭제하시겠습니까?");
    if (ok) {
      await userRef.collection("plans").doc(planObj.id).delete();
    }
  };

  return (
    <>
      <div className="card-wrapper mr-5">
        <div
          className="card-top"
          style={{ backgroundColor: colors[index % 5].primaryColor }}
        ></div>
        <div className="plan-holder">
          <span
            className="card-holder"
            style={{
              backgroundColor: colors[index % 5].secondaryColor,
              borderRadius: "10px",
            }}
          >
            {planObj.title}
          </span>
          <p>{planObj.description}</p>
          <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
            <FaEdit
              onClick={onShow}
              style={{ color: colors[index % 5].primaryColor }}
            />
            <FaTrashAlt
              onClick={onDeleteClick}
              style={{ color: colors[index % 5].primaryColor }}
            />
          </div>
        </div>
      </div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>계획 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>계획 이름</Form.Label>
              <Form.Control
                onChange={(e) => setNewTitle(e.target.value)}
                type="text"
                value={newTitle}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>대략적인 설명</Form.Label>
              <Form.Control
                onChange={(e) => setNewDescription(e.target.value)}
                type="text"
                value={newDescription}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            계획 수정
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardPanel;

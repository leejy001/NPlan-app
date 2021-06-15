import React, { useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import { Button, Modal, Form } from "react-bootstrap";
import "./form.css";
import { dbService } from "../firebase";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(title, description)) {
      addPlan();
    }
  };

  const addPlan = async () => {
    const newPlan = {
      title: title,
      description: description,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      createrId: user.uid,
      createrName: user.displayName,
      createrImage: user.photoURL,
    };

    try {
      await dbService.collection("plans").add(newPlan);
      // 초기화
      setTitle("");
      setDescription("");
      setShow(false);
    } catch (error) {
      alert(error);
    }
  };

  const isFormValid = (title, description) => title && description;

  return (
    <>
      <div className="header text-center">
        <h2 style={{ fontWeight: "bold" }}>N Plan</h2>
        <Button onClick={onShow} variant="primary" className="mt-2">
          Create Plan
        </Button>
      </div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>계획 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>계획 이름</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="이름 입력"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>대략적인 설명</Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="어떤 계획 인가요?"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            계획 추가
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;

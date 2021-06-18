import React, { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { BsTrash, BsPencil } from "react-icons/bs";
import { GrFormAdd } from "react-icons/gr";
import { useSelector } from "react-redux";
import { dbService } from "../../firebase";
import "../form.css";

function SectionPanel({ sectionObj }) {
  const user = useSelector((state) => state.user.currentUser);
  const plan = useSelector((state) => state.plan.currentplan);
  const planRef = dbService
    .collection("users")
    .doc(user.uid)
    .collection("plans")
    .doc(plan.id);
  const [show, setShow] = useState(false);
  const [newSection, setNewSection] = useState(sectionObj.sectionTitle);

  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  const isFormValid = (newSection) => newSection;

  const editSectionSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(newSection)) {
      editSection();
    }
  };

  const editSection = async () => {
    try {
      await planRef.collection("sections").doc(sectionObj.id).update({
        sectionTitle: newSection,
      });
      // 초기화
      setNewSection("");
      setShow(false);
    } catch (error) {
      alert(error);
    }
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("계획을 삭제하시겠습니까?");
    if (ok) {
      await planRef.collection("sections").doc(sectionObj.id).delete();
    }
  };

  return (
    <div className="section-panel">
      <div className="section-main">
        {show ? (
          <div>
            <Form onSubmit={editSectionSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>섹션 이름</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNewSection(e.target.value)}
                  value={newSection}
                />
              </Form.Group>
              <div>
                <Button
                  onClick={editSectionSubmit}
                  variant="outline-primary"
                  style={{ width: "155px", float: "left" }}
                >
                  섹션 수정
                </Button>
                <Button onClick={onClose} style={{ marginLeft: "15px" }}>
                  취소
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <div>
            <div style={{ marginTop: "5px", float: "left" }}>
              {sectionObj.sectionTitle}
            </div>
            <Dropdown>
              <Dropdown.Toggle
                className="section-menu"
                style={{
                  color: "black",
                  background: "transparent",
                  border: "0px",
                }}
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={onShow}>
                  <BsPencil />
                  &nbsp;섹션 편집
                </Dropdown.Item>
                <Dropdown.Item onClick={onDeleteClick}>
                  <BsTrash />
                  &nbsp;섹션 삭제
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
      <div style={{ marginTop: "5px" }}>
        <button
          style={{
            backgroundColor: "#ffffff",
            border: "0",
            outline: "0",
          }}
        >
          <GrFormAdd />할 일 추가
        </button>
      </div>
    </div>
  );
}

export default SectionPanel;

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import { useSelector } from "react-redux";
import { dbService } from "../../firebase";
import { RiFlag2Fill } from "react-icons/ri";
import TodoModal from "../Modal/TodoModal";
import "../form.css";

function TodoPanel({ todoObj, sectionObj }) {
  const user = useSelector((state) => state.user.currentUser);
  const plan = useSelector((state) => state.plan.currentplan);
  const sectionRef = dbService
    .collection("users")
    .doc(user.uid)
    .collection("plans")
    .doc(plan.id)
    .collection("sections")
    .doc(sectionObj.id);

  const [show, setShow] = useState(false);
  const [newTodo, setNewTodo] = useState(todoObj.todoTitle);
  const [newLevel, setNewLevel] = useState(todoObj.todoLevel);

  const onShow = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  const [modalShow, setModalShow] = useState(false);

  const onModalShow = () => {
    setModalShow(true);
  };
  const onModalClose = () => {
    setModalShow(false);
  };

  const onNewTodoSubmit = async (e) => {
    e.preventDefault();
    try {
      await sectionRef.collection("todos").doc(todoObj.id).update({
        todoTitle: newTodo,
        todoLevel: newLevel,
      });
      // 초기화
      setShow(false);
    } catch (error) {
      alert(error);
    }
  };

  const onDeleteClick = async () => {
    const ok = window.confirm(`${todoObj.todoTitle}를 삭제하시겠습니까?`);
    if (ok) {
      await sectionRef.collection("todos").doc(todoObj.id).delete();
      window.alert("삭제 취소");
    } else {
      window.alert("삭제 확인");
    }
  };

  return (
    <>
      {show ? (
        <Form onSubmit={onNewTodoSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="할 일 입력..."
            />
            <div className="d-flex mb-2">
              <Form.Check
                className="importance"
                value="red"
                type="radio"
                checked={newLevel === "red"}
                onChange={(e) => setNewLevel(e.target.value)}
              />
              <RiFlag2Fill
                className="flag"
                style={{ color: "red" }}
                title="중요"
              />
              <Form.Check
                className="importance"
                value="orange"
                type="radio"
                checked={newLevel === "orange"}
                onChange={(e) => setNewLevel(e.target.value)}
              />
              <RiFlag2Fill
                className="flag"
                style={{ color: "orange" }}
                title="보통"
              />
              <Form.Check
                className="importance"
                value="green"
                type="radio"
                checked={newLevel === "green"}
                onChange={(e) => setNewLevel(e.target.value)}
              />
              <RiFlag2Fill
                className="flag"
                style={{ color: "green" }}
                title="낮음"
              />
              <Form.Check
                className="importance"
                value="none"
                type="radio"
                checked={newLevel === "none"}
                onChange={(e) => setNewLevel(e.target.value)}
              />
              <RiFlag2Fill className="flag" />
            </div>
            <div>
              <Button
                onClick={onNewTodoSubmit}
                variant="outline-primary"
                style={{ width: "150px", height: "35px", float: "left" }}
              >
                Todo 수정
              </Button>
              <Button
                onClick={onClose}
                style={{ marginLeft: "15px", height: "35px" }}
              >
                취소
              </Button>
            </div>
          </Form.Group>
        </Form>
      ) : (
        <>
          <div className="todo-panel">
            <div
              className="delete-check"
              onClick={onDeleteClick}
              style={{ border: `1px ${newLevel} solid` }}
            />
            <div className="todo-title" onClick={onModalShow}>
              {todoObj.todoTitle}
            </div>
            <BsPencil
              className="todo-edit"
              onClick={onShow}
              style={{ marginLeft: "10px", marginTop: "5px" }}
            />
          </div>
          <TodoModal
            show={modalShow}
            onModalClose={onModalClose}
            sectionObj={sectionObj}
            todoObj={todoObj}
          />
        </>
      )}
    </>
  );
}

export default TodoPanel;

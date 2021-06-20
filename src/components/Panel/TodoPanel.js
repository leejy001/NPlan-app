import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { dbService } from "../../firebase";

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

  const onShow = () => {
    setShow(true);
  };

  const onNewTodoSubmit = async (e) => {
    e.preventDefault();
    try {
      await sectionRef.collection("todos").doc(todoObj.id).update({
        todoTitle: newTodo,
      });
      // 초기화
      setNewTodo("");
      setShow(false);
    } catch (error) {
      alert(error);
    }
  };

  const onDeleteClick = async () => {
    const ok = window.confirm(`${todoObj.todoTitle}를 삭제하시겠습니까?`);
    if (ok) {
      await sectionRef.collection("todos").doc(todoObj.id).delete();
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
          </Form.Group>
        </Form>
      ) : (
        <div className="todo-panel">
          <div className="delete-check" onClick={onDeleteClick}></div>
          <div className="todo-title">{todoObj.todoTitle}</div>
          <BsPencil
            className="todo-edit"
            onClick={onShow}
            style={{ marginLeft: "10px", marginTop: "5px" }}
          />
        </div>
      )}
    </>
  );
}

export default TodoPanel;

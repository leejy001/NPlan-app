import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { dbService } from "../../firebase";
import MarkDown from "./MarkDown";

const TodoModal = ({ show, onModalClose, sectionObj, todoObj }) => {
  const user = useSelector((state) => state.user.currentUser);
  const plan = useSelector((state) => state.plan.currentplan);
  const todoRef = dbService
    .collection("users")
    .doc(user.uid)
    .collection("plans")
    .doc(plan.id)
    .collection("sections")
    .doc(sectionObj.id)
    .collection("todos")
    .doc(todoObj.id);
  const [editShow, setEditShow] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState(todoObj.todoContent);
  const onEditShow = () => setEditShow(true);
  const onEditClose = () => {
    onEditTodo();
    setEditShow(false);
  };

  const onEditTodo = async () => {
    await todoRef.update({ todoContent: newTodoContent });
  };

  return (
    <Modal show={show} onHide={onModalClose}>
      <Modal.Header>
        <Modal.Title>{todoObj.todoTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "490px", minHeight: "300px" }}>
        {editShow ? (
          <div>
            <textarea
              style={{ width: "470px", minHeight: "300px" }}
              onChange={(e) => setNewTodoContent(e.target.value)}
              value={newTodoContent}
            />
          </div>
        ) : (
          <MarkDown todoContent={newTodoContent} />
        )}
      </Modal.Body>
      <Modal.Footer>
        {editShow ? (
          <Button variant="success" onClick={onEditClose}>
            Save
          </Button>
        ) : (
          <Button variant="primary" onClick={onEditShow}>
            Do it
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TodoModal;

import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { BsTrash, BsPencil } from "react-icons/bs";
import { useSelector } from "react-redux";
import { dbService } from "../../firebase";
import firebase from "firebase";
import "../form.css";
import TodoPanel from "./TodoPanel";

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

  const [todoShow, setTodoShow] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const onTodoShow = () => setTodoShow(true);

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
    const ok = window.confirm("섹션을 삭제하시겠습니까?");
    if (ok) {
      await planRef.collection("sections").doc(sectionObj.id).delete();
    }
  };

  useEffect(() => {
    dbService
      .collection("users")
      .doc(user.uid)
      .collection("plans")
      .doc(plan.id)
      .collection("sections")
      .doc(sectionObj.id)
      .collection("todos")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const sectionArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimeout(() => {
          setTodos(sectionArray);
        }, 200);
      });
  }, [user.uid, plan.id, sectionObj.id]);

  const addTodo = async () => {
    const newTodo = {
      todoTitle: todo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      createrId: user.uid,
      createrName: user.displayName,
    };

    try {
      await planRef
        .collection("sections")
        .doc(sectionObj.id)
        .collection("todos")
        .add(newTodo);
      // 초기화
      setTodo("");
      setTodoShow(false);
    } catch (error) {
      alert(error);
    }
  };

  const onTodoSubmit = (e) => {
    e.preventDefault();
    if (isTodoFormValid(todo)) {
      addTodo();
    }
  };

  const isTodoFormValid = (todo) => todo;

  const TodoList = (
    <div className="todo-container">
      {todos.map((todo, index) => (
        <TodoPanel
          key={todo.id}
          index={index}
          todoObj={todo}
          sectionObj={sectionObj}
        />
      ))}
    </div>
  );

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
      {TodoList}
      {todoShow ? (
        <Form onSubmit={onTodoSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="할 일 입력..."
            />
          </Form.Group>
        </Form>
      ) : (
        <div style={{ marginTop: "5px" }}>
          <button
            onClick={onTodoShow}
            className="add-todolist"
            style={{
              backgroundColor: "#ffffff",
              border: "0",
              outline: "0",
            }}
          >
            + 할 일 추가
          </button>
        </div>
      )}
    </div>
  );
}

export default SectionPanel;

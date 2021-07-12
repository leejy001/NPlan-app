import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { BsTrash, BsPencil } from "react-icons/bs";
import { useSelector } from "react-redux";
import { dbService } from "../../firebase";
import { RiFlag2Fill } from "react-icons/ri";
import firebase from "firebase/app";
import "../form.css";
import TodoPanel from "./TodoPanel";
import moment from "moment";

function SectionPanel({ sectionObj }) {
  const user = useSelector((state) => state.user.currentUser);
  const plan = useSelector((state) => state.plan.currentplan);
  const searchLevel = useSelector((state) => state.plan.currentLevel);
  const sectionRef = dbService
    .collection("users")
    .doc(user.uid)
    .collection("plans")
    .doc(plan.id)
    .collection("sections")
    .doc(sectionObj.id);
  const [show, setShow] = useState(false);
  const [newSection, setNewSection] = useState(sectionObj.sectionTitle);

  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  const [todoShow, setTodoShow] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [level, setLevel] = useState("none");

  const onTodoShow = () => setTodoShow(true);
  const onTodoClose = () => setTodoShow(false);

  const isFormValid = (newSection) => newSection;

  const editSectionSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(newSection)) {
      editSection();
    }
  };

  const editSection = async () => {
    try {
      await sectionRef.update({
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
      await sectionRef.delete();
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
        const todoArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimeout(() => {
          setTodos(todoArray);
        }, 200);
      });
  }, [user.uid, plan.id, sectionObj.id]);

  const addTodo = async () => {
    const newTodo = {
      todoTitle: todo,
      todoContent: "",
      todoLevel: level,
      todoStart: moment().format("yyyy-MM-DD"),
      todoEnd: moment().format("yyyy-MM-DD"),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      createrId: user.uid,
      createrName: user.displayName,
    };

    try {
      await sectionRef.collection("todos").add(newTodo);
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
      {todos
        .filter((todo) => {
          if (searchLevel === "all") {
            return todo;
          } else if (searchLevel === todo.todoLevel) {
            return todo;
          }
          return false;
        })
        .map((todo, index) => (
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
          <div className="d-flex justify-content-between">
            <div className="section-title">{sectionObj.sectionTitle}</div>
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
            <div className="d-flex mb-2">
              <Form.Check
                className="importance"
                value="red"
                type="radio"
                checked={level === "red"}
                onChange={(e) => setLevel(e.target.value)}
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
                checked={level === "orange"}
                onChange={(e) => setLevel(e.target.value)}
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
                checked={level === "green"}
                onChange={(e) => setLevel(e.target.value)}
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
                checked={level === "none"}
                onChange={(e) => setLevel(e.target.value)}
              />
              <RiFlag2Fill className="flag" title="전체" />
            </div>
            <div>
              <Button
                onClick={onTodoSubmit}
                variant="outline-primary"
                style={{ width: "150px", height: "35px", float: "left" }}
              >
                Todo 추가
              </Button>
              <Button
                onClick={onTodoClose}
                style={{ marginLeft: "15px", height: "35px" }}
              >
                취소
              </Button>
            </div>
          </Form.Group>
        </Form>
      ) : (
        <div style={{ marginTop: "10px" }}>
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

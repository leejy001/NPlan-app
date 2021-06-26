import React, { useState, forwardRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { dbService } from "../../firebase";
import MarkDown from "./MarkDown";
import { AiTwotoneEdit, AiFillSave, AiOutlineMinus } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import DatePicker from "react-datepicker";
import "../form.css";
import moment from "moment";
import ko from "date-fns/locale/ko";

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
    await todoRef.update({
      todoContent: newTodoContent,
      todoStart: moment(startDate).format("yyyy-MM-DD"),
      todoEnd: moment(endDate).format("yyyy-MM-DD"),
    });
  };

  const [startDate, setStartDate] = useState(new Date(todoObj.todoStart));
  const [endDate, setEndDate] = useState(new Date(todoObj.todoEnd));

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="calendar-btn" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <Modal show={show} onHide={onModalClose}>
      <Modal.Header style={{ height: "50px" }}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Modal.Title style={{ fontSize: "30px" }}>
            {todoObj.todoTitle}
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "300px" }}>
        {editShow ? (
          <>
            <div
              className="d-flex"
              style={{
                width: "218px",
                borderRadius: "75px",
                backgroundColor: "whitesmoke",
              }}
            >
              <DatePicker
                locale={ko}
                selected={startDate}
                onChange={setStartDate}
                customInput={<CustomInput />}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
              />
              <AiOutlineMinus style={{ marginTop: "10px", color: "black" }} />
              <DatePicker
                locale={ko}
                selected={endDate}
                onChange={setEndDate}
                customInput={<CustomInput />}
                dateFormat="yyyy-MM-dd"
                minDate={startDate}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div className="d-flex">
              <MdDescription className="mt-1" size="24" />
              <h4>Description</h4>
            </div>
            <textarea
              style={{ width: "470px", height: "500px" }}
              onChange={(e) => setNewTodoContent(e.target.value)}
              value={newTodoContent}
            />
          </>
        ) : (
          <>
            <div className="d-flex">
              <div
                style={{
                  fontSize: "15px",
                  color: "white",
                  margin: "0px 5px",
                  padding: "0px 10px",
                  borderRadius: "75px",
                  backgroundColor: "#1E90FF",
                }}
              >
                {todoObj.todoStart}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  color: "white",
                  padding: "0px 10px",
                  borderRadius: "75px",
                  backgroundColor: "#DC143c",
                }}
              >
                {todoObj.todoEnd}
              </div>
            </div>
            <div className="d-flex">
              <MdDescription className="mt-1" size="24" />
              <h4>Description</h4>
            </div>
            <MarkDown todoContent={newTodoContent} />
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ height: "70px" }}>
        {editShow ? (
          <Button variant="success" onClick={onEditClose}>
            <AiFillSave style={{ color: "white" }} size="20" /> 저장하기
          </Button>
        ) : (
          <Button variant="primary" onClick={onEditShow}>
            <AiTwotoneEdit style={{ color: "white" }} size="20" /> 수정하기
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TodoModal;

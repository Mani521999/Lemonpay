import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { MdDescription, MdOutlineClose } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toaster } from "../Library";
import { Axios } from "../Axios";

function Addtask(props) {
  const [formValue, setFormValue] = useState({
    taskName: "",
    description: "",
    dueDate: new Date(),
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormValue(...formValue, ...{ [name]: value });
    setErrors(...formValue, ...{ [name]: "" });
  };
  const addTask = async () => {
    try {
      const data = await Axios({
        method: "POST",
        url: "http://localhost:2001/api/v1/task/createTask",
        data: formValue
      });
      console.log("datadata", data);

      if (data.success) {
        toaster(data.message, "success");
      } else {
        setErrors(data.errors);
      }
    } catch (e) {
      console.log("addTask-err", e);
    }
  };
  return (
    <div>
      <Modal
        show={props?.addtasks}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="d-flex justify-content-end mt-2 me-2">
          <MdOutlineClose className="close" onClick={props.onDismiss} />{" "}
        </div>
        <h2 className="text-center mt-3"> Add Task</h2>

        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter Task Name"
            className="mb-3 taskinput"
            onChange={(e) => handleChange("taskName", e.target.value)}
          />
          <p style={{ color: "red" }}>{errors?.email}</p>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            className="mb-3"
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <p style={{ color: "red" }}>{errors?.email}</p>
          <DatePicker
            selected={formValue?.dueDate}
            onChange={(date) => handleChange("dueDate", date)}
            placeholderText="Date Picker"
            minDate={new Date()}
          />
          <div className="text-center">
            {props?.type == "add" ? (
              <>
                <button className="taskbtn mb-3 mt-3" onClick={addTask}>
                  {" "}
                  Save{" "}
                </button>{" "}
                <br />
              </>
            ) : (
              <>
                <button className="taskbtn mb-3 mt-3"> Save </button> <br />
              </>
            )}
            <button className="cancelbtn mb-3" onClick={props.onDismiss}>
              {" "}
              Cancel{" "}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Addtask;

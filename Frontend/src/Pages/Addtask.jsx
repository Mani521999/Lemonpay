import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { MdOutlineClose } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Addtask(props) {

    const[addtasks, setAddtasks] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
  return (
    <div>

    <Modal show={addtasks} 
    size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>

        <div className='d-flex justify-content-end mt-2 me-2'>
        <MdOutlineClose className='close' onClick={props.onDismiss}/> </div>
           <h2 className='text-center mt-3'> Add Task</h2>
       
        <Modal.Body>
        <Form.Control type="text" placeholder="Enter Task Name" className='mb-3 taskinput' />
        <Form.Control  as="textarea" rows={3} placeholder="Description" className='mb-3' />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='Date Picker'/>
            <div className='text-center'>
            <button className='taskbtn mb-3 mt-3'> Save </button> <br/>
            <button className='cancelbtn mb-3' onClick={props.onDismiss}> Cancel </button>
            </div>
        </Modal.Body>
    </Modal>


    </div>
  )
}

export default Addtask
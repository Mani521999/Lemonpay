import React, { useState } from 'react'
import { Container, Dropdown } from 'react-bootstrap';
import { GoPlus } from "react-icons/go";
import DataTable from 'react-data-table-component';
import { HiOutlineDotsVertical } from "react-icons/hi";
import Addtask from './Addtask';
import Swal from 'sweetalert2'

function Taskmanagement() {
     const[addtasks, setAddtasks] = useState(false);

    const cancelfun = () =>{
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }

    const columns = [
        { name: 'No', selector: row => row.no },
        { name: 'Date & Time', selector: row => row.datetime },
        { name: 'Task', selector: row => row.task },
        { name: 'Description', selector: row => row.desc },
        { name: 'Action', selector: row => row.action, ignoreRowClick: true,
            allowOverflow: true,
            button: true, },
      ];
      
      const data = [
        { no: 1, datetime: '25/5/2025 2.00PM', task: 'Design Poster', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
             action: <Dropdown align="end">
                <Dropdown.Toggle><HiOutlineDotsVertical color='#000'/></Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={()=>setAddtasks(true)}>Edit</Dropdown.Item> 
                <Dropdown.Item onClick={()=>cancelfun()}>Delete</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>  },
        { no: 2, datetime: '25/5/2025 2.00PM', task: 'Design Poster', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',  action: <Dropdown align="end">
            <Dropdown.Toggle><HiOutlineDotsVertical color='#000'/></Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick={()=>setAddtasks(true)}>Edit</Dropdown.Item> 
            <Dropdown.Item onClick={()=>cancelfun()}>Delete</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>},
              { no: 3, datetime: '25/5/2025 2.00PM', task: 'Design Poster', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',  action: <Dropdown align="end">
                <Dropdown.Toggle><HiOutlineDotsVertical color='#000'/></Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={()=>setAddtasks(true)}>Edit</Dropdown.Item> 
                <Dropdown.Item onClick={()=>cancelfun()}>Delete</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>},
              
      ];


  return ( 
    <>
    {addtasks && <Addtask onDismiss={()=>setAddtasks(false)}/>}
    <div className='admin_back'>
    <Container>
    <h2 className='pt-3 pt-md-5 maintitle pb-3 pb-md-0'>Tasks Management</h2>
    <div className='text-end'><button className='taskbtn mb-3' onClick={()=>setAddtasks(true)}><GoPlus/> Add Task </button></div>

    <div className="custom-datatable">
     <DataTable  columns={columns} data={data} pagination />
     </div>

    </Container>
    

    </div>
    </>
  )
}

export default Taskmanagement
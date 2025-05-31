import React, { useCallback, useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

import Addtask from "./Addtask";
import { Axios } from "../Axios";
import { toaster } from "../Library";

function Taskmanagement() {
  const [type, setType] = useState("add");
  const [addtasks, setAddtasks] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedData, setSelectedData] = useState({});

  const fetchTasks = useCallback(async () => {
    const data = await Axios({
      method: "GET",
      url: "http://localhost:2001/api/v1/task/getAllTask",
      params: { ...pagination, _: Date.now() }, // prevent cache
    });
    if (data.success) {
      setRecords(data.data);
      setCount(data.count);
    }
  }, [pagination]);

  const removeTasks = async (rowData) => {
    const data = await Axios({
      method: "GET",
      url: "http://localhost:2001/api/v1/task/deleteTask",
      params: { _id: rowData._id },
    });
    if (data.success) {
      toaster(data.message, "success");
      fetchTasks();
    }
  };

  const cancelfun = (rowData) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeTasks(rowData);
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const columns = [
    { name: "No", selector: (row, i) => i + 1 },
    { name: "Date & Time", selector: (row) => row.dueDate },
    { name: "Task", selector: (row) => row.taskName },
    { name: "Description", selector: (row) => row.description },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ position: "relative", zIndex: 9999 }}>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              style={{ boxShadow: "none" }}
              id={`dropdown-${row._id}`}
            >
              <HiOutlineDotsVertical color="#000" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedData(row);
                  setType("edit");
                  setAddtasks(true);
                }}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  e.stopPropagation();
                  cancelfun(row);
                }}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handlePerPageChange = (newPerPage) => {
    setPagination((prev) => ({ ...prev, limit: newPerPage }));
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks,addtasks]);

  return (
    <>
      {addtasks && (
        <Addtask
          type={type}
          addtasks={addtasks}
          onDismiss={() => setAddtasks(false)}
          onSuccess={() => {
            fetchTasks(); // ✅ Refresh list after save
            setAddtasks(false);
          }}
          data={selectedData}
        />
      )}
      <div className="admin_back">
        <Container>
          <h2 className="pt-3 pt-md-5 maintitle pb-3 pb-md-0">
            Tasks Management
          </h2>
          <div className="text-end">
            <button
              className="taskbtn mb-3"
              onClick={() => {
                setType("add");
                setSelectedData({});
                setAddtasks(true);
              }}
            >
              <GoPlus /> Add Task
            </button>
          </div>
          <div className="custom-datatable" style={{ overflow: "visible" }}>
            <DataTable
              columns={columns}
              data={records}
              pagination
              paginationServer
              paginationTotalRows={count}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerPageChange}
            />
          </div>
        </Container>
      </div>
    </>
  );
}

export default Taskmanagement;

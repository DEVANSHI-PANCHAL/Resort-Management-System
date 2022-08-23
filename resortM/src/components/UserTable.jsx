import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form, Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
    createUser,
    deleteUser,
    editUser,
    getUser,
  } from "../service/authService";

const UserTable = () => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("submit");
  const [formData, setFormData] = useState();
  const [users, setUsers] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const editBtn = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button className="outline-primary" onClick={() => handleEdit(row)}>
        Edit
      </Button>
    );
  };

  const deleteBtn = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button className="outline-danger" onClick={() => handleDelete(row)}>
        Delete
      </Button>
    );
  };

  const columns = [
    { dataField: "username", text: "username", sort: true },
    { dataField: "fullName", text: "Full name", sort: true },
    { dataField: "userType", text: "user Type" },
    { dataField: "gamePoints", text: "Points" },
    {
      dataField: "edit",
      text: "Edit",
      formatter: editBtn,
      sort: true,
    },
    {
      dataField: "delete",
      text: "Delete",
      formatter: deleteBtn,
      sort: true,
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      if (mode === "submit") {
        const { data } = await createUser(formData);
        console.log(data);
      } else {
        const { data } = await editUser(formData);
        console.log(data);
      }
      handleClose();
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const { data } = await getUser();
      console.log(data.users);
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
 
    getAllUsers();
}, []);

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userType: "user",
    });
  };

  const handleEdit = async (row) => {
    try {
      handleShow();
      console.log(row)
      setFormData(row);
      setMode("edit");
    } catch (error) {
      console.log(error);
    }
  };

 

  const handleDelete = async (row) => {
    try {
      const userId = row._id;
      console.log(userId);
      const { data } = await deleteUser(userId);
      console.log(data);
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <>
      <Row>
        <Col md={{ span: 2, offset: 5 }} className="text-center">
          <Button className="mt-3" onClick={handleShow}>Add User</Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>UserType</Form.Label>
              <Form.Control
                type="text"
                name="userType"
                value="user"
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={handleOnChange}
                value={formData?.username}
                name="username"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                onChange={handleOnChange}
                value={formData?.fullName}
                name="fullName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleOnChange}
                value={formData?.password}
                name="password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h2 className="text-center my-3">Users Table</h2>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-success me-2"
            table="table-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Export To Excel"
          />
          <BootstrapTable
          id="table-xls"
            keyField="name"
            data={users}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 5 })}
          />
        </Col>
      </Row>
    </>
  );
};

export default UserTable;

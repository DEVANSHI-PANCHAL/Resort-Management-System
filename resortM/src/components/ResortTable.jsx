import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form, Image } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  addResort,
  deleteResort,
  editResort,
  getResort,
} from "../service/resortService";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFillEyeFill } from "react-icons/bs";

// import Badge from 'react-bootstrap/Badge';

const ResortTable = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState("");
  const [mode, setMode] = useState("submit");
  const [resorts, setResorts] = useState([]);
  const [open, setOpen] = useState(false);
  // const [displayedImg, setDisplayedImg] = useState("");
  
 

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleEdit = async (resort) => {
    try {
      handleShow();
      console.log(resort)
      setFormData(resort);
      setMode("edit");
    } catch (error) {
      console.log(error);
    }
  };

  const editBtn = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button className="outline-primary" onClick={() => handleEdit(row)}>
        Edit
      </Button>
    );
  };

  // const statusBadge = (row) => {
  //   return (
  //     <Badge pill bg="success">
  //     Available
  //   </Badge>
  //   );
  // };

  const deleteBtn = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button className="outline-danger" onClick={() => handleDelete(row)}>
        Delete
      </Button>
    );
  };

  // const handleDisplayImage = (row) => {
  //   setOpen(!open);
  //   console.log(row);
  //   setDisplayedImg(row.image);
  // };

  // const displayImg = (row) => {
  //   return <BsFillEyeFill onClick={() => handleDisplayImage(row)} />;
  // };

  const columns = [
    { dataField: "status", text: "status",  },
    { dataField: "resortname", text: "Resort Name", sort: true },
    { dataField: "description", text: "Description", sort: true },
    // { dataField: "Image", text: "Image", formatter: displayImg },
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

  const handleDelete = async (row) => {
    // console.log("resorts",resortId)
    try {
      
      const resortId = row._id;
      console.log(resortId);
      const { data } = await deleteResort(resortId);
      console.log(data);
      getResorts();
    } catch (error) {
      console.log(error);
    }
  };



  // const userInfo = JSON.parse(localStorage.getItem("user"));

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      // username: userInfo.username,
    });
  };

  const createResort = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      if (mode === "submit") {
        const { data } = await addResort(formData);
        console.log(data);
        
      } else {
        const { data } = await editResort(formData);
        console.log(data);
      }
      handleClose();
      getResorts();
    } catch (error) {
      console.log(error);
    }
  };

  const getResorts = async () => {
    try {
      const { data } = await getResort();
      console.log(data);
      setResorts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      
      var convertedFile = reader.result;
      // console.log(convertedFile);
      setFormData({ ...formData, image: convertedFile });
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const handleImageChange = (e) => {
    const fileList = e.target.files;
    console.log(fileList);

    if (fileList) {
      toBase64(fileList[0]);
    }
  };

  const handleStatusChange = (e) => {
      setFormData({ ...formData, status: e.target.value });

  }

  useEffect(() => {
    getResorts();
  }, []);

  return (
    <>
      <Row>
        <Col md={{ span: 2, offset: 5 }} className="text-center">
          <Button onClick={handleShow}>Add Resort</Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Resort</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createResort}>
            <Form.Group className="mb-3">
              <Form.Label>Resort Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Resort Name"
                name="resortname"
                onChange={handleOnChange}
                value={formData.resortname}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData?.description}
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>


            <Form.Group className="d-flex align-items-center">
            <Form.Check type="radio" value="Available" name="status" label="Available" className="me-3" onChange={handleStatusChange} /> 
            <Form.Check type="radio" value="Unavailable" selected name="status" label="Unavailable" onChange={handleStatusChange} /> 
            
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <Modal show={open} onHide={handleDisplayImage}>
        <Modal.Header closeButton>
          <Modal.Title>Resort Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={displayedImg} alt="Resort Image" />
        </Modal.Body>
      </Modal> */}


      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h2 className="text-center my-3">Resorts Table</h2>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-success me-2"
            table="resort-table"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Export To Excel"
          />
          <BootstrapTable
          id="resort-table"
            keyField="name"
            data={resorts}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 5 })}
          />
        </Col>
      </Row>
    </>
  );
};

export default ResortTable;

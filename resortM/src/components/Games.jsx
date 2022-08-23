import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form, Table } from "react-bootstrap";
import { addGame, deleteGame, editGame, getAllGames } from "../service/gameService";
import BootstrapTable from "react-bootstrap-table-next";
import Badge from 'react-bootstrap/Badge';
import paginationFactory from "react-bootstrap-table2-paginator";
import { getAvailableResort } from "../service/resortService";
import ReactHTMLTableToExcel from "react-html-table-to-excel";


const Games = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [formData, setFormData] = useState();
  const [mode, setMode] = useState("submit");
  const [games, setGames] = useState([]);
  const [resorts, setResorts] = useState([]);

  const [availableResort,setAvailableResort] = useState("");


  const statusBadge = (cell, row, rowIndex, formatExtraData) => {
    if(row.status === "Available"){

    }
    else{

    }
    return (
    <>

    </>
      // <Chip size={"small"} label={row.resolved ? "Resolved" : "Active"} color={row.resolved ? "success" : "primary"} />
      // <Badge pill  label={{row.status === "Available"} ? {bg="primary"} : {bg="success"} } />
      // {row.status}
    // </Badge>
    );
  };

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
    { dataField: "status", text: "Status"},
    { dataField: "gameName", text: "Game Name"},
    { dataField: "description", text: "Description", sort: true },
    { dataField: "gamePoints", text: "Game Points", sort: true },
    { dataField: "resortDetails", text: "Resort"},
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
  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
    });
  };

  const handleDropDownChange = (e) => {
    const val = e.target.value;
    const id = val._id;
    console.log("val",val);
    console.log("id",id);//undefined
    // console.log("val"+ JSON.stringify(e.target.value))
    const resortDetails = resorts.filter(resort => resort._id === val)[0] // CHANGELOG: storing whole resort object in form data rather than resort name only
    console.log("RD ", resortDetails, resorts)
    setFormData({ ...formData, resortDetails: resortDetails });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      console.log("fromData:",formData.resortDetails);
      if (mode === "submit") {
        const { data } = await addGame(formData);
        console.log("games",games);
        console.log("data",data);
      } else {
        const { data } = await editGame(formData);
        console.log(data);
      }
      handleClose();
      getAllGamesFunc();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGamesFunc = async () => {
    try {
      const { data } = await getAllGames();
      console.log(data);
      setGames(data);
    } catch (error) {
      console.log(error);
    }
  };



  const handleEdit = async (games) => {
    try {
      handleShow();
      setFormData(games);
      setMode("edit");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (games) => {
    try {
      const gamesId = games._id;
      console.log(gamesId);
      const { data } = await deleteGame(gamesId);
      console.log(data);
      getAllGamesFunc();
    } catch (error) {
      console.log(error);
    }
  };



 

  const getAvailableResorts = async () => {
    try {
        const { data } = await getAvailableResort();
      console.log(data);
      setResorts(data);
    } catch (error) {
        console.log(error)
    }
  }

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.value });

}

  useEffect(() => {
    getAllGamesFunc();
    getAvailableResorts();
  },[]);

  const handleResortSelect = (e) => {
    console.log("event : ", JSON.stringify(e.target.value))
  }

  return (
    <>
      <Row>
        <Col md={{ span: 2, offset: 5 }} className="text-center">
          <Button onClick={handleShow}>Add Games</Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Game Name</Form.Label>
              <Form.Control type="text" name="gameName" onChange={handleOnChange} value={formData?.gameName}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                onChange={handleOnChange}
                value={formData?.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Game Points</Form.Label>
              <Form.Control type="text" name="gamePoints" value={formData?.gamePoints} onChange={handleOnChange}/>
            </Form.Group>


            <Form.Group className="d-flex align-items-center" >
            <Form.Check type="radio" value="Available" name="status" label="Available" className="me-3"  onChange={handleStatusChange} /> 
            <Form.Check type="radio" value="Unavailable" selected name="status" label="Unavailable" onChange={handleStatusChange} /> 
            
            </Form.Group>

            <Form.Label>Available Resorts</Form.Label>
            <Form.Select aria-label="Default select example" onChange={handleDropDownChange} value={formData?.resortDetails}>
              <option>Select Resort</option>
              {resorts.map((resort,index) => {
                return(
                  <>
                  <option key={index} value={resort._id}>
                    {resort.resortname}
                  </option>
            
              </>
              );
              })}
            </Form.Select>

         

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>


          
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h2 className="text-center my-3">Games Table</h2>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-success me-2"
            table="games-table"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Export To Excel"
          />
          <BootstrapTable
          id="games-table"
            keyField="name"
            data={games}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 5 })}
          />
        </Col>
      </Row>
    </>
  );
};

export default Games;

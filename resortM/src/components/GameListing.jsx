import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Button, Modal, Form, Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getAvailableGames } from '../service/gameService';
import { addGamePoint, getGamePoint } from '../service/authService';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const GameListing = () => {
    const[games,setGames] = useState([]);
    const[gamePoints,setGamePoints] = useState(0);
    const [counter, setCounter] = useState(0);

    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = state;

    const playBtn = (cell, row, rowIndex, formatExtraData) => {
        return (
          <Button className="outline-primary" onClick={() => addPoint(row)} >
            Play
          </Button>
        );
      };

      const increase = async (row) => {
        const pointssToAdd = row.gamePoints
        console.log("+ wala ",pointssToAdd)

        setCounter(count => count + pointssToAdd);

        const { data } = await addGamePoint(pointssToAdd);
        console.log("new",data)
      };
      const plusBtn = (cell, row, rowIndex, formatExtraData) => {
        return (
          <Button className="outline-primary" onClick={() => increase(row)} >
            +
          </Button>
        );
      };

      const user = JSON.parse(localStorage.getItem('user'));
      const addPoint = async(row) => {
        try {
            const userId = user._id
            const pointToAdd = row.gamePoints
            console.log("Point to add",pointToAdd);
            const gameDetails = {
                points : gamePoints + pointToAdd,
                userId: userId
            }
            console.log(gameDetails)
            const { data } = await addGamePoint(gameDetails);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
      }
    const columns = [
       
        { dataField: "gameName", text: "Game Name"},
        { dataField: "description", text: "Description", sort: true },
        { dataField: "gamePoints", text: "Game Points", sort: true },
        
        {
          dataField: "play",
          text: "Play",
        formatter:playBtn ,
         
        },
        {
          dataField: "plus",
          text: "Plus",
        formatter:plusBtn ,
         
        },
    
      ];


   
      const getAllGames = async () => {
        try {
          const { data } = await getAvailableGames(id);
          console.log(data);
          setGames(data);
        } catch (error) {
          console.log(error);
        }
      };



      const getGamePoints = async () => {
        try {
          const id = user._id;
          const { data } = await getGamePoint(id);
          console.log(data)
          
          setGamePoints(data.user.gamePoints);
        } catch (error) {
          console.log(error);
        }
      };

      const addTotalGamePoints = async () => {
        try {
          
        } catch (error) {
          console.log(error)
        }
      }
      
      const handleLogOut = () => {
        localStorage.clear();
        navigate("/");
      };

      useEffect(() => {
        getAllGames();
        
        
      },[]);

      useEffect(() => {
        getGamePoints();
      },[gamePoints])
  return (
    <>
      <Container>
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Navbar.Brand>Games</Navbar.Brand>
          </Container>
          <Container>Points: {counter}</Container>
          <Container>
            <Button onClick={handleLogOut}>Log Out</Button>
          </Container>
        </Navbar>
      </Container>


     <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h2 className="text-center my-3">Available Games</h2>
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
            data={games}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 5 })}
          />
        </Col>
      </Row>
    </>
  )
}

export default GameListing
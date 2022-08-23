import React,{ useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { useNavigate } from "react-router-dom";
import { getResort } from "../service/resortService";

const UserPanel = () => {
  const [resorts, setResorts] = useState([]);

  const navigate = useNavigate();

  const getAllResorts = async () => {
    try {
      const { data } = await getResort();
      console.log(data);
      setResorts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllResorts();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCheckIn = (resort) => {
      console.log(resort._id);
    navigate("/gamelist", {state: {id: resort._id}});
  };
  return (
    <>
      <Container>
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Navbar.Brand>Resorts</Navbar.Brand>
          </Container>
          <Container>
            <Button onClick={handleLogOut}>Log Out</Button>
          </Container>
        </Navbar>
      </Container>

      <div className="d-flex justify-content-around flex-wrap align-items-center">
        {resorts.map((resort, index) => {
          return (
            <>
              <Card key={index} style={{ width: "18rem", marginTop: "15px" }} >
                <Card.Img variant="top" src={resort.image} />
                <Card.Body>
                  <Card.Title>{resort.resortname}</Card.Title>
                  <Card.Text>{resort.description}</Card.Text>
                  <Button variant="primary" onClick={() => handleCheckIn(resort)}>Check in</Button>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};
export default UserPanel;

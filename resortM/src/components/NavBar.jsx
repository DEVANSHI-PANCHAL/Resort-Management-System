import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ResortTable from "./ResortTable";
import UserTable from "./UserTable";
import Games from "./Games";
import { NavLink } from "react-router-dom";

import LoginPage from "../pages/LoginPage";


import {
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/")
  }
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to = "usertable">User</Nav.Link>
            <Nav.Link as={NavLink} to = "resorttable">Resort</Nav.Link>
            <Nav.Link as={NavLink} to = "games">Games</Nav.Link>
            
          </Nav>
          <Nav>
          <Button onClick={handleLogOut}>Log Out</Button>
            
           
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* <Outlet /> */}
    </Navbar>
    <Outlet/>
<Routes>

   
   {/* <Route path="/home" element={<Home />}/> */}
   


</Routes>
    </>

  )
}

export default NavBar
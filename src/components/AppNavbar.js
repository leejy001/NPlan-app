import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import UserPanel from "./Panel/UserPanel";

const AppNavbar = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#e9eef6" }}>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px", width: "100%" }}
          navbarScroll
        >
          <UserPanel />
        </Nav>
        <Form className="d-flex" style={{ marginRight: "20px" }}>
          <FormControl
            type="search"
            placeholder="Plan Search"
            aria-label="Search"
            style={{ marginRight: "10px" }}
          />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;

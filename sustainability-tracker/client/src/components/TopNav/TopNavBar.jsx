import './TopNavBar.css';

import { useState, useRef } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

import { NavLink } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TopNavBar() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <Navbar id="topNav" collapseOnSelect expand="lg" className="bg-body-tertiary ps-3">
      <NavLink to="/">
        <Navbar.Brand>
          Sustainablity Tracker
        </Navbar.Brand>
      </NavLink>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink}>Demo1</Nav.Link> {/* to ... is missing*/}
          <Nav.Link as={NavLink}>Demo2</Nav.Link>

        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

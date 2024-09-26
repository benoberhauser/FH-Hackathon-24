import './TopNavBar.css';

import { useState, useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default function TopNavBar() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <Navbar id="topNav" collapseOnSelect expand="lg" className="bg-body-tertiary ps-3">
      <Navbar.Brand>
        Sustainablity Tracker
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      </Navbar.Collapse>

    </Navbar>
  );
}

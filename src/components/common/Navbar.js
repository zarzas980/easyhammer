import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar as ReactNavbar} from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/App.css"

function Navbar() {
  return (
    <Container fluid className="accent">
    <ReactNavbar sticky="top" expand="lg" >
        <Container fluid>
            <ReactNavbar.Brand href="#home">EasyHammer</ReactNavbar.Brand>
            <ReactNavbar.Toggle aria-controls="basic-navbar-nav" />
            <ReactNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#changelog">Changelog</Nav.Link>
                <Nav.Link href="#link">FAQ</Nav.Link>
            </Nav>
            </ReactNavbar.Collapse>
        </Container>
    </ReactNavbar>
    </Container>
  );
}

export default Navbar;
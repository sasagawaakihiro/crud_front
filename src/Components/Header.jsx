import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">掲示板</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Category">Category</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/manage">Manage</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <label>ログイン状態: {this.props.loggedInStatus}</label>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default Header
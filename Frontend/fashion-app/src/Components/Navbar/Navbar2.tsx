import React from 'react'
import {Container, Nav ,Navbar as NavbarBS, Button}  from 'react-bootstrap'
import {NavLink} from "react-router-dom"
// import { NavbarStyle } from './StyleNavbar/NavbarStyle';
import {NavbarStyle, NavbarStyle2} from './StyleNavbar'
import { MDBNavbar} from 'mdb-react-ui-kit'
const Navbar = () => {
  return (
    <NavbarBS className='bg-white shadow-sm mb-3'>
        <Container style={NavbarStyle2}>
        <Nav  className='me-auto'>
            <Nav.Link to={"/"}as={NavLink}>
                Home
            </Nav.Link>
            <Nav.Link to={"/store"}as={NavLink}>
                Store
            </Nav.Link>
            <Nav.Link to={"/about"}as={NavLink}>
                About
            </Nav.Link>
        </Nav>
        {/* <Button>
            
        </Button> */}
        </Container>
    </NavbarBS>
  )
}

export default Navbar
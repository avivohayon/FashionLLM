import React from 'react'
import { Outlet, NavLink} from 'react-router-dom'
import { Button,Container, Nav, Navbar as NavbarBS } from 'react-bootstrap'
import {useState} from 'react'
import './StyleNavbar/SubNavbarEffects2.css'


const SubNavbar = () => {

    const [isClicked, setIsClicked] = useState(false);

  return (
    <NavbarBS 
    style={{background: "linear-gradient(90deg, #DCE2F1 9.64%, #ECEEF1 58.53%)",
    maxWidth: "100%",
    // maxHeight:'100px',
    // paddingBottom:"0.5rem",
    // display:'flex',
    // justifyContent:'center',
    marginTop:' 2rem',
    border: '9px solid green'
  }}>
    <Container className="container"
    style={{
      display:"flex", 
      justifyContent:"center",
      paddingTop:"20px",
      paddingBottom:"20px",
      maxHeight:"100%",
      maxWidth:'100%',
      marginBottom:'2rem'
      }}>
      <Nav className="nav"
      style={{    
       gap:"10rem"
       }}>
        <Nav.Link to = 'hats' as={NavLink} className="nav-link">
        hats
        </Nav.Link>
        <Nav.Link to = 'glasses' as={NavLink} className="nav-link">
        glasses
        </Nav.Link>
        <Nav.Link to = 'jewelry' as={NavLink} className="nav-link" >
        jewelry
        </Nav.Link>
        <Nav.Link to = 'tops' as={NavLink} className="nav-link">
        tops
        </Nav.Link>
        <Nav.Link to = 'pants' as={NavLink} className="nav-link">
        pants
        </Nav.Link>
        <Nav.Link to = 'shoes' as={NavLink} className="nav-link" >
        shoes
        </Nav.Link>
      </Nav>
      {/* <Button 
      variant='outline-primary'
      style={{
      width:"8rem",
      height:"3rem",
      direction:"ltr",
      borderRadius:'10px' ,
      border:' 2px solid #FAA70E',
      color:'#FAA70E',
      
      position:"relative",
      marginLeft:'8rem'

      }}>


      </Button> */}



    </Container>
  </NavbarBS>

  )
}

export default SubNavbar
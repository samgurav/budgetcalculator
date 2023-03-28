import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav,Container,Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router'
export const NavigationBar = () => {
    const navigate=useNavigate()
    const [flag,setFlag]=useState(false)
    const Logout=()=>{
   
        sessionStorage.clear()
       alert("logout")
       setFlag(true)
       

       
      
       
      }
    return (
        <>
     <Navbar   style={{background:'#007acc'}} expand="lg" >
        <Container>
            <Navbar.Brand href="#home" ><b><span style={{color:' white',marginRight:'300px'}} >Neosoft Technologies</span></b> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"  >
                <Nav.Link as={NavLink} to="/dashboard" style={{marginLeft:'30px',marginRight:'100px',fontSize:'20px',fontFamily:'bold'}}  ></Nav.Link>
                <Nav.Link   style={{marginLeft:'400px',marginRight:'500px',fontSize:'25px',fontFamily:'bold',color:'white'}}  onClick={Logout} >Logout</Nav.Link>
                {flag? navigate('/login'):null}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar> 
            
        </>
    )
}

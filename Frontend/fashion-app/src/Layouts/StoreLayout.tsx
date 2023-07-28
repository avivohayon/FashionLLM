import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet, useNavigate, useLocation  } from 'react-router-dom'
import { SubNavbar } from '../Components'

const StoreLayout = () => {
  const containerStyle : React.CSSProperties = {
    height: '120px',
    fontFamily: 'Tel Aviv',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '48px',
    lineHeight: '150%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent:'center',    
    color: '#0C223D',    
    flex: 'none',
    order: 0,
    flexGrow: 0,
    maxWidth:"100%",
    background:" linear-gradient(90deg, #DCE2F1 9.64%, #ECEEF1 58.53%)",
    paddingTop:"4rem",
    paddingBottom:"2rem"
    }
  

  const buttunStyle = {
      padding: `0px 24px 0px 16px`,
      width: '9rem',
      height: '3rem',
      color: 'white',    
      background: '#1352CB',
      boxShadow: `0px 2px 10px rgba(0, 0, 0, 0.05), 5px -5px 20px 10px rgba(0, 0, 0, 0.02), -3px -4px 20px 10px rgba(0, 0, 0, 0.05)`,
      borderRadius: `8px`,
      flexGrow: '0'
      }
  
  const handleNext = (destination : String) => {
    navigate(`/store/${destination}`);
  };


const handlePrevious = (destination : String) => {
    navigate(`/store/${destination}`);
  };

  const navigate = useNavigate()
  const location = useLocation();

  const isSubNavbarActive = location.pathname.includes('/store/hats') ||
  location.pathname.includes('/store/glasses') ||
  location.pathname.includes('/store/jewelry') ||
  location.pathname.includes('/store/tops') ||
  location.pathname.includes('/store/pants') ||
  location.pathname.includes('/store/shoes')


  return (
    <Container style={{display:'flex', flexDirection:'column'}}>
        <Container style={{...containerStyle, height:"1rem"}}>
        Create you OWN custom Kabbalat Shabbat

       </Container>
       <Container>
       {isSubNavbarActive && <SubNavbar/>}

       </Container>
       <Container
       style={{maxWidth:"100%", background:" linear-gradient(90deg, #DCE2F1 9.64%, #ECEEF1 58.53%)", 
      }}> 
        <Outlet/>

       </Container>
       <>
      
       <Container
          style={{
            ...containerStyle,
            height: '30rem',
            fontSize: '32px',
            flexDirection: 'column',
            gap: '3rem',
            justifyContent: 'flex-start',
          }}
        >
          <button style={buttunStyle} onClick={() => handleNext('hats')}>Next</button>
        </Container>
        </>
    </Container>
  )
}

export default StoreLayout
{/* <div>StoreLayout</div> */}

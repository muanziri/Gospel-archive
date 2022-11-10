/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import axios from 'axios'


// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import Google from "assets/images/google.png";


// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
function DashboardNavbar({ absolute, light, isMini }) {
  
  let BackendProxy='http://localhost:3001'
  
  const [userData,setUserData]=useState()
  useEffect(()=>{
    axios.get(BackendProxy+'/api',{withCredentials:true})
    .then(function (response) {
      // console.log(response.data);
    })
    .catch(function (error) {
      // console.log(error);
    });
    fetch(BackendProxy+"/api",{
      
      method:'GET',
      credentials : 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
      
    })
    .then((results)=>{
      return results.json()
    })
    .then((results)=>{setUserData(results); 
    })
  },[]);
   
  let initialUrl=window.location.href+'/VideoPlayer/';
 const {data} = useFetch(BackendProxy+"/api/Content");
const content=data;
  
  const Notif = useFetch(BackendProxy+"/api/notification");
  const notifications= Notif.data;
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 760px)").matches
  )

  const [matched, setMatched] = useState(
    window.matchMedia("(max-width: 1200px)").matches
  )

  useEffect(() => {
    window
      .matchMedia("(min-width: 760px)")
      .addEventListener('change', e => setMatches(e.matches));
  }, []);
  useEffect(() => {
    window
      .matchMedia("(min-width: 1200px)")
      .addEventListener('change', e => setMatched(e.matches));
  }, []);
  function displaySearField() {
    document.getElementById('searchDisplay').style.display = 'block'
  }
  function HideSearField() {
    setTimeout(()=>{
      document.getElementById('searchDisplay').style.display = 'none'
    },300)
   
  }
  function SearchFilter() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }



    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
   
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  //const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const closeContentModal=()=>{
    document.getElementById('ContentEditor1').style.display='none'
  }
  const OpenContentModal=()=>{
    document.getElementById('ContentEditor1').style.display='block'
  }
  const GoogleAuthenticate=()=>{
    window.location.assign(BackendProxy+"/api/auth/google")
  }
  const FacebookAuthenticate=()=>{
    window.location.assign(BackendProxy+"/api/auth/facebook")
  }
  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {userData?notifications&& userData.user !== "no user" ? notifications.notif.filter(videocontent => videocontent.userName ==  userData.user.userName).map((element)=>(
        <NotificationItem
        image={<img src={element.ProfilePhotoUrl} alt="person" />}
        title={["",element.Notification]}
        date={element.createdAt}
        onClick={handleCloseMenu}
      />
      )):<NotificationItem
      title={['No notification or login']}
      date={'to day'}
      onClick={handleCloseMenu}
    />:<NotificationItem
    image={<img  alt="person" />}
    title={['No notification or login']}
    date={'to day'}
    onClick={handleCloseMenu}
  />}
    </Menu>
  );

  return (
    <>
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox pr={1}>
              <SoftInput
                onFocus={displaySearField}
                onBlur={HideSearField}
                onKeyUp={SearchFilter}
                
                id='myInput'
                placeholder="Search for your video"
                icon={{ component: "search", direction: "left" }}
              />
            </SoftBox>
            {matches &&
            (<>
            {matched?
            <div id='searchDisplay' style={{ position: 'absolute', width: '100%', left: '0%', top: '85%', maxHeight: '400px', backgroundColor:'rgb(23,193,232,0.7)',overflowY: 'scroll', display: 'none' }} className='w3-animate-bottom'>
            
            <ul  id="myUL">
              {content?
              content.map((element)=>
               <center> <li className="w3-hover-white "><a href={initialUrl+element.VideoId}><b>{element.Title}</b></a></li></center>
              )
              :<center><li><a href="#">loading....</a></li></center>}
            </ul>
          </div>:
          <div id='searchDisplay' style={{ position: 'absolute',borderBottomLeftRadius:'20px',borderBottomRightRadius:'20px',width: '100%', left: '0%', top: '85%', maxHeight: '400px', backgroundColor:'rgb(23,193,232,0.7)',overflowY: 'scroll', display: 'none' }} className='w3-animate-bottom'>
            
          <ul style={{paddingTop:'30px'}} id="myUL">
            {content?
            content.map((element)=>
            <center><li style={{height:'100px',marginBottom:'10px'}} className="w3-hover-blue "><a href={initialUrl+element.ThumbnailId}><b>{element.Title}</b><img  style={{width:'100px',position:'absolute',marginBottom:'2px',right:'5px'}} src={"https://drive.google.com/uc?export=download&id="+element.VideoId}></img></a></li></center>
            )
            :<center><li><a href="#">loading....</a></li></center>}
          </ul>
        </div>
          }
            </>)
        }
      {!matches &&
        (<div id='searchDisplay' style={{ position: 'absolute', width: '80%', left: '4%', top: '85%', maxHeight: '400px', backgroundColor:'rgb(23,193,232,0.7)',overflowY: 'scroll', display: 'none' }} className='w3-animate-bottom'>
            
        <ul id="myUL">
          {content?
          content.map((element)=>
           <center> <li className="w3-hover-white"><a href={initialUrl+element.VideoId}><b>{element.Title}</b></a></li></center>
          )
          :<center><li><a href="#">loading....</a></li></center>}
        </ul>
      </div>)}
            
            <SoftBox color={light ? "white" : "inherit"}>
              {userData ?
                userData.user !== 'no user' ?
                  <Link to="/profile">
                    <IconButton sx={navbarIconButton} size="small">
                      <SoftAvatar variant="rounded" style={{ width: '30px', height: '30px' }} src={userData.user.ProfilePhotoUrl} shadow="md" />
                      <SoftTypography
                        variant="button"
                        fontWeight="medium"
                        color={light ? "white" : "dark"}
                      >
                        {userData.user.userName}
                      </SoftTypography>
                    </IconButton>
                  </Link> :
                  
                    <IconButton onClick={OpenContentModal} sx={navbarIconButton} size="small">
                      <Icon
                        sx={({ palette: { dark, white } }) => ({
                          color: light ? white.main : dark.main,
                        })}
                      >
                        account_circle
                      </Icon>
                      <SoftTypography
                        variant="button"
                        fontWeight="medium"
                        color={light ? "white" : "dark"}
                      >
                        Sign in/Sign up
                      </SoftTypography>
                    </IconButton>
                  
                :
                
                  <IconButton onClick={OpenContentModal} sx={navbarIconButton} size="small">
                    <Icon
                      sx={({ palette: { dark, white } }) => ({
                        color: light ? white.main : dark.main,
                      })}
                    >
                      account_circle
                    </Icon>
                    <SoftTypography
                      variant="button"
                      fontWeight="medium"
                      color={light ? "white" : "dark"}
                    >
                      Sign in/Sign up
                    </SoftTypography>
                  </IconButton>
            
              }

              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
    <div id='ContentEditor1'class="w3-modal" >
       <br/>
        <br/>
        <br/>
          
      
          
        <div className="w3-modal-content w3-card-4 w3-animate-zoom w3-round" style={{ maxWidth: '600px', }}>
        <span onClick={closeContentModal} className="w3-button w3-xlarge w3-transparent w3-display-topright " >×</span>
           <div className="w3-section">
            <center>
              <h2>Continue with</h2>
              <img onClick={GoogleAuthenticate} style={{width:'20%'}}src={Google}></img>
              <h2>or</h2>
              <a onClick={FacebookAuthenticate}><i style={{fontSize:'450%',color:'#17C1E8'}} class="fa-brands fa-facebook"></i></a>
              <br/>
              <br/>
            </center>
           </div>
        </div>
      </div>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;

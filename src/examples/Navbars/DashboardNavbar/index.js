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
import axios from "axios";

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
import backendProxy from "BackendProxy";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import Google from "assets/images/google.webp";

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
  //let backendProxy = "http://localhost:3001";
  let WindowWidth = window.innerWidth;
  let contenta;
  const [userData, setUserData] = useState();
  useEffect(() => {
    axios
      .get(backendProxy + "/api", { withCredentials: true })
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
    fetch(backendProxy + "/api", {
      method: "GET",
      credentials: "include",
      mode: "cors",
    })
      .then((results) => {
        return results.json();
      })
      .then((results) => {
        setUserData(results);
        //console.log(results);
      });
  }, []);
  let initialUrl = window.location.href + "/VideoPlayer/";
  const searchFunction = () => {
    var formData = new FormData();
    formData.append("payload", document.getElementById("myInput").value);
    //console.log(JSON.stringify({payload:document.getElementById('myInput').value}))
    fetch(backendProxy + "/api/search", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          contenta = response;
          contenta.forEach((element) => {
            let newLi = document.createElement("li");
            let aEl = document.createElement("a");
            newLi.className = "w3-hover-white ";
            aEl.href = initialUrl + element.VideoId;
            aEl.innerText = element.Title;
            newLi.appendChild(aEl);

            if (document.getElementById("myInput").value == "") {
              document.getElementById("myUL").innerHTML = "";
            } else {
              document.getElementById("myUL").appendChild(newLi);
            }
          });
        } //{document.getElementById('myUL').innerHtml=response.map(<center> <li className="w3-hover-white "><a href={initialUrl+response.VideoId}><b>{response.Title}</b></a></li></center>)
      });
  };
  const Notif = useFetch(backendProxy + "/api/notification");
  const notifications = Notif.data;
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const [matches, setMatches] = useState(window.matchMedia("(min-width: 760px)").matches);

  const [matched, setMatched] = useState(window.matchMedia("(max-width: 1200px)").matches);

  useEffect(() => {
    window
      .matchMedia("(min-width: 760px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  useEffect(() => {
    window
      .matchMedia("(min-width: 1200px)")
      .addEventListener("change", (e) => setMatched(e.matches));
  }, []);

  function passwordCheck() {
    var p = document.getElementById("password").value;

    if (p.length < 8) {
      document.getElementById("charactersCheck").style.display = "block";
    } else {
      document.getElementById("charactersCheck").style.display = "none";
    }
    if (p.search(/[a-z]/i) < 0) {
      document.getElementById("latterCheck").style.display = "block";
    } else {
      document.getElementById("latterCheck").style.display = "none";
    }
    if (p.search(/[0-9]/) < 0) {
      document.getElementById("DigitCheck").style.display = "block";
    } else {
      document.getElementById("DigitCheck").style.display = "none";
    }
  }
  function comparePasswords(){
    if(document.getElementById("newPassword").value !== document.getElementById("confirmPassword").value){
      document.getElementById("charactersMatch").style.display = "block";
    }else{
      document.getElementById("charactersMatch").style.display = "none";

    }
  }
  function passwordCheck1() {
    var p = document.getElementById("newPassword").value;

    if (p.length < 8) {
      document.getElementById("charactersCheck1").style.display = "block";
    } else {
      document.getElementById("charactersCheck1").style.display = "none";
    }
    if (p.search(/[a-z]/i) < 0) {
      document.getElementById("latterCheck1").style.display = "block";
    } else {
      document.getElementById("latterCheck1").style.display = "none";
    }
    if (p.search(/[0-9]/) < 0) {
      document.getElementById("DigitCheck1").style.display = "block";
    } else {
      document.getElementById("DigitCheck1").style.display = "none";
    }
  }
  function ChangeTologin() {
    document.getElementById("signUp").style.display = "none";
    document.getElementById("login").style.display = "block";
    if(document.getElementById("resetPassword").style.display = "block"){
      document.getElementById("resetPassword").style.display = "none"
    }
  }
  function ChangeToSignUp() {
    document.getElementById("login").style.display = "none";
    document.getElementById("signUp").style.display = "block";
    if(document.getElementById("resetPassword").style.display = "block"){
      document.getElementById("resetPassword").style.display = "none"
    }
  }
  function ChangeResetPassword() {
    document.getElementById("login").style.display = "none";
    document.getElementById("resetPassword").style.display = "block";
  }
  function PostSignUp() {
    let Email = document.getElementById("Username").value;
    let password = document.getElementById("password").value;
    let Phone = document.getElementById("PhoneNumber").value;
    let name = document.getElementById("Name").value;
     if(Email !== '' && password !== '' && Phone !== "" && name !== ""){
    let fd = new FormData();
    fd.append("Email", Email);
    fd.append("password", password);
    fd.append("Phone", Phone);
    fd.append("name", name);
    //console.log(Email,password,Phone,name)
    fetch(backendProxy + "/api/authentication/SignUp", {
      method: "POST",
      mode: "cors",
      body: fd,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.messageSuccess) {
          document.getElementById("login").style.display = "block";
          document.getElementById("signUp").style.display = "none";

          document.getElementById("SuccessBlock").style.display = "block";
          document.getElementById("SuccessMessage").innerText = response.messageSuccess;
        } else {
          if (response.messageFailure) {
            document.getElementById("warningBlock").style.display = "block";
            document.getElementById("warningMessage").innerText = response.messageFailure;
          }
        }
      });}else{
        document.getElementById("warningMessage").innerText="Please fill in the required information"
      }
  }
  function PostLogin() {
    let Email = document.getElementById("UsernameLogin").value;
    let password = document.getElementById("passwordLogin").value;
    if(Email !== '' && password !== ''){
      let fd = new FormData();
      fd.append("Email", Email);
      fd.append("password", password);
      fetch(backendProxy + "/api/authentication/SignIn", {
        method: "POST",
        mode: "cors",
        credentials: 'include',
        "content-type": "application/x-www-form-urlencoded",
        body: new URLSearchParams({
          Email: Email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if(response.successAuth){
            window.location.reload()
          }else{
            if(response.auth){
           document.getElementById('authMessage').innerText=response.auth;
            }
          }
        });
    }else{
      document.getElementById('authMessage').innerText="Please fill in the required information";
  }
   
  }
  function postReset(){
    document.getElementById('postResetSubmit').innerText='Wait for a minute'
    let Email = document.getElementById("resetEmail").value;
    if(Email !== ''){let fd = new FormData();
    fd.append("Email", Email);
    fetch(backendProxy + "/api/ResetPassword", {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      "content-type": "application/x-www-form-urlencoded",
      body: new URLSearchParams({
        Email: Email
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if(response.successresetResponce == "Reset Code sent"){
         document.getElementById('resetPassword').style.display='none'
         document.getElementById('newPasswordRegestration').style.display='block'

        }else{
          document.getElementById('resetResponce').innerText=response.resetResponce;
        }
      });}else{
        document.getElementById('resetResponce').innerText="Please fill in the required information"
    }
  }
  function passwordResetProcceed(){
    document.getElementById('postResetProceedSubmit').innerText='Wait for a minute'
    let ResetPin = document.getElementById("resetPin").value;
    let newPassword = document.getElementById("newPassword").value;

    if(ResetPin !== '' && newPassword !== ''){
      let fd = new FormData();
    fd.append("ResetPin", ResetPin);
    fd.append("newPassword", newPassword);
    fetch(backendProxy + "/api/ResetPasswordProceeds", {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      "content-type": "application/x-www-form-urlencoded",
      body: new URLSearchParams({
        ResetPin: ResetPin,
        newPassword: newPassword
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
         if(response.resetResponce){
           document.getElementById('resetActualResponce').innerText=response.resetResponce}
           if(response.successresetResponce){
            document.getElementById('login').style.display='block'
            document.getElementById('newPasswordRegestration').style.display='none'
          }
      });

    }else{document.getElementById('resetActualResponce').innerText="Please fill in the required information"}
    
  }
  function displaySearField() {
    document.getElementById("searchDisplay").style.display = "block";
  }
  function HideSearField() {
    setTimeout(() => {
      document.getElementById("searchDisplay").style.display = "none";
    }, 300);
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
  const closeContentModal = () => {
    document.getElementById("ContentEditor1").style.display = "none";
  };
  const OpenContentModal = () => {
    document.getElementById("ContentEditor1").style.display = "block";
  };
  const GoogleAuthenticate = () => {
    window.location.assign(backendProxy + "/api/auth/google");
  };
  const FacebookAuthenticate = () => {
    window.location.assign(backendProxy + "/api/auth/facebook");
  };
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
      {userData ? (
        notifications && userData.user !== "no user" ? (
          notifications.notif
            .filter((videocontent) => videocontent.userName == userData.user.userName)
            .map((element) => (
              <NotificationItem
                image={<img src={element.ProfilePhotoUrl} alt="person" />}
                title={["", element.Notification]}
                date={element.createdAt}
                onClick={handleCloseMenu}
              />
            ))
        ) : (
          <NotificationItem
            title={["No notification or login"]}
            date={"to day"}
            onClick={handleCloseMenu}
          />
        )
      ) : (
        <NotificationItem
          image={<img alt="person" />}
          title={["No notification or login"]}
          date={"to day"}
          onClick={handleCloseMenu}
        />
      )}
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
          <SoftBox
            color="inherit"
            mb={{ xs: 1, md: 0 }}
            sx={(theme) => navbarRow(theme, { isMini })}
          >
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </SoftBox>
          {isMini ? null : (
            <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
              <SoftBox pr={1}>
                <SoftInput
                  onFocus={displaySearField}
                  onBlur={HideSearField}
                  onKeyUp={searchFunction}
                  id="myInput"
                  placeholder="Search for your video"
                  icon={{ component: "search", direction: "left" }}
                />
              </SoftBox>
              <div
                id="searchDisplay"
                style={{
                  position: "absolute",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  width: "100%",
                  left: "0%",
                  top: "85%",
                  maxHeight: "400px",
                  backgroundColor: "rgb(23,193,232,0.7)",
                  overflowY: "scroll",
                  display: "none",
                }}
                className="w3-animate-bottom"
              >
                <center>
                  <ul style={{ paddingTop: "30px" }} id="myUL"></ul>
                </center>
              </div>

              {WindowWidth>500?<SoftBox color={light ? "white" : "inherit"}>
                {userData ? (
                  userData.user !== "no user" ? (
                    <Link to="/profile">
                      <IconButton sx={navbarIconButton} size="small">
                        <SoftAvatar
                          variant="rounded"
                          style={{ width: "30px", height: "30px" }}
                          src={userData.user.ProfilePhotoUrl}
                          shadow="md"
                        />
                        <SoftTypography
                          variant="button"
                          fontWeight="medium"
                          color={light ? "white" : "dark"}
                        >
                          {userData.user.userName}
                        </SoftTypography>
                      </IconButton>
                    </Link>
                  ) : (
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
                  )
                ) : (
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
                )}

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
              </SoftBox>:''}
            </SoftBox>
          )}
        </Toolbar>
      </AppBar>
      
      <div id="ContentEditor1"  className="w3-modal">
     
        <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={WindowWidth<500?{ maxWidth: "600px" ,marginTop:'30%'}:{ maxWidth: "600px" ,marginTop:'0%'}}>
        <span
              className="w3-button  w3-xlarge w3-hover-red "
              title="Close Modal"
              onClick={closeContentModal}
            >
              &times;
      </span>
          <div id="signUp" style={{display:'none'}} className="w3-center w3-animate-right">
            <br />
            
            <form className="w3-container" action="/action_page.php">
              <div className="w3-section">
                <label>
                  <b>Email</b>
                </label>
                <input
                  id="Username"
                  className="w3-input w3-border w3-margin-bottom"
                  type="text"
                  placeholder="Enter Username"
                  name="usrname"
                  required
                />
                <label>
                  <b>Password</b>
                </label>
                <input
                  onKeyUp={passwordCheck}
                  id="password"
                  className="w3-input w3-border"
                  type="password"
                  placeholder="Enter Password"
                  name="psw"
                  required
                />
                <div id="charactersCheck"
                  style={{ display: "none" }}
                  className="w3-block w3-yellow "
                >
                  <h6>Password must be 8 characters </h6>
                </div>
                <div id="latterCheck" style={{ display: "none" }} className="w3-block w3-yellow ">
                  <h6>Password must have rom A-Z/a-z </h6>
                </div>
                <div id="DigitCheck" style={{ display: "none" }} className="w3-block w3-yellow ">
                  <h6>Password must have from 0-9</h6>
                </div>
                <label>
                  <b>Phone Number</b>
                </label>
                <input
                  id="PhoneNumber"
                  className="w3-input w3-border"
                  type="text"
                  placeholder="(+Country-code)----"
                  name="psw"
                  required
                />
                <label>
                  <b>Username</b>
                </label>
                <input
                  id="Name"
                  className="w3-input w3-border"
                  type="text"
                  placeholder="John"
                  name="psw"
                  required
                />
              </div>
              <div id="warningBlock" className="w3-block w3-yellow ">
                <h6 id="warningMessage"></h6>
              </div>
              <div
                id="SuccessBlock"
                style={{ display: "none" }}
                className="w3-block w3-green w3-animate-left"
              >
                <h6 id="SuccessMessage"></h6>
              </div>
            </form>
            <center>
              <button
                onClick={PostSignUp}
                className=" w3-button   w3-blue w3-section w3-padding"
                type="submit"
              >
                Sign Up
              </button>
            </center>
            <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
              <button onClick={ChangeTologin} type="button" className="w3-button w3-blue">
                Switch to Login
              </button>
            </div>
          </div>
          <div id="login" style={{ display: "block" }} className="w3-center w3-animate-right">
            <br />
            <form className="w3-container" action="/action_page.php">
              <div className="w3-section">
                <div
                  id="SuccessBlock"
                  style={{ display: "none" }}
                  className="w3-block w3-green w3-animate-left"
                >
                  <h6 id="SuccessMessage"></h6>
                </div>
                <label>
                  <b>Email</b>
                </label>
                <input
                  id="UsernameLogin"
                  className="w3-input w3-border w3-margin-bottom"
                  type="text"
                  placeholder="Enter Username"
                  name="Email"
                  required
                />
                <label>
                  <b>Password</b>
                </label>
                <input
                  id="passwordLogin"
                  className="w3-input w3-border"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  required
                />
              </div>
              <h6 id="authMessage"  className="w3-block w3-yellow "></h6>
            </form>
            <button
              onClick={PostLogin}
              className=" w3-button   w3-blue w3-section w3-padding"
              type="submit"
            >
              login
            </button>
            <br/>
            <p>if you forgot password click<a style={{cursor:'pointer',color:'#17C1E8'}} onClick={ChangeResetPassword}> here </a>for help</p>
            <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
              <button onClick={ChangeToSignUp} type="button" className="w3-button w3-blue">
                Switch to signup
              </button>
            </div>
          </div>
          <div id="resetPassword" style={{ display: "none" }} className="w3-center w3-animate-right">
            <br />
            <form className="w3-container">
              <div className="w3-section">
                <label>
                  <b>Email</b>
                </label>
                <input
                  id="resetEmail"
                  className="w3-input w3-border w3-margin-bottom"
                  type="text"
                  placeholder="Fill in your email to reset your password"
                  name="Email"
                  required
                />
                
              </div>
            </form>
            <h6 id="resetResponce"  className="w3-block w3-yellow "></h6>
            <button
              id="postResetSubmit"
              onClick={postReset}
              className=" w3-button   w3-blue w3-section w3-padding"
              type="submit"
            >
              Submit
            </button>
            <br/>
            <div className="w3-container w3-border-top w3-padding-16 w3-light-grey">
              <button onClick={ChangeToSignUp} type="button" className="w3-button w3-display-bottomleft w3-blue w3-margin">
                Go back to signup
              </button>
              <br/>
              <button onClick={ChangeTologin} type="button" className="w3-button w3-display-bottomright w3-blue w3-margin">
                Go back to Login
              </button>
            </div>
          </div>
          <div id="newPasswordRegestration" style={{ display: "none" }} className="w3-center w3-animate-right">
            <br />
            <form className="w3-container">
              <div className="w3-section">
                <label>
                  <b>new password</b>
                </label>
                <input
                  id="newPassword"
                  onKeyUp={passwordCheck1}
                  className="w3-input w3-border w3-margin-bottom"
                  type="password"
                  placeholder="new password"
                  name="password"
                  required
                /> 
                <div id="charactersCheck1"
                  style={{ display: "none" }}
                  className="w3-block w3-yellow "
                >
                  <h6>Password must be 8 characters </h6>
                </div>
                <div id="latterCheck1" style={{ display: "none" }} className="w3-block w3-yellow ">
                  <h6>Password must have rom A-Z/a-z </h6>
                </div>
                <div id="DigitCheck1" style={{ display: "none" }} className="w3-block w3-yellow ">
                  <h6>Password must have from 0-9</h6>
                </div>
                <label>
                  <b>confirm password</b>
                </label>
                <input
                  id="confirmPassword"
                  onKeyUp={comparePasswords}
                  className="w3-input w3-border w3-margin-bottom"
                  type="password"
                  placeholder="Confirm password"
                  name="Email"
                  required
                /> 
                <label>
                
                <div id="charactersMatch" style={{ display: "none" }} className="w3-block w3-yellow ">
                  <h6>Password must have from 0-9</h6>
                </div>
                  <b>Reset Code</b>
                </label>
                <input
                  id="resetPin"
                  className="w3-input w3-border w3-margin-bottom"
                  type="text"
                  placeholder="Reset Code"
                  name="digit"
                  required
                /> 
              </div>
             <h6 id="resetActualResponce" className="w3-block w3-yellow "></h6>
            </form>

            <button
              id="postResetProceedSubmit"
              onClick={passwordResetProcceed}
              className=" w3-button   w3-blue w3-section w3-padding"
              type="submit"
            >
              Submit
            </button>
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

import React from 'react'
import backendProxy from "BackendProxy";

export  function useAuthenticate() {
    const closeContentModal = () => {
        document.getElementById("ContentEditor1").style.display = "none";
      };
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
      const OpenContentModal = () => {
        document.getElementById("ContentEditor1").style.display = "block";
      };
  return {
    OpenContentModal,
   passwordCheck,
 closeContentModal,
  renderAuth: ( <div id="ContentEditor1"  className="w3-modal">
     
    <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ maxWidth: "600px" }}>
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
         </div>)
}
}



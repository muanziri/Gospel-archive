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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import backendProxy from 'BackendProxy';
import { Navigate } from "react-router-dom"


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function AccountStatus({views,likes}) {
  function logout(){
    document.getElementById('logout').innerText='logging out';
    document.getElementById('logout').disabled=true;
    fetch(backendProxy + "/api/logout", {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      "content-type": "application/x-www-form-urlencoded",
      body: new URLSearchParams({
        status: "logging out"
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        if(response.ActivateResponce ){
        window.location.reload()
        }
      });
  }
  
  return (
    <Card>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Account status
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
        <SoftBox display="flex" py={1} mb={0.25}>
          <SoftBox width="80%" ml={2}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              Views : {views}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox display="flex" py={1} mb={0.25}>
          <SoftBox width="80%" ml={2}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              Likes : {likes}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <button onClick={logout} id='logout' className="w3-button w3-blue w3-margin">Click to logout</button>
       
        
      </SoftBox>
    </Card>
  );
}

export default AccountStatus;

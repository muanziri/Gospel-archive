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

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function PlatformSettings({Ammount}) {
  const openModal=()=>{
    document.getElementById('SupportModel').style.display='block'
  }
  const closeModal=()=>{
    document.getElementById('SupportModel').style.display='none'
  }
  return (
    <Card>
      <SoftBox pt={2} px={2}>
        <center>
          <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            Support You recieved
          </SoftTypography>
        </center>
        <center>
          <SoftBox>
            <b>
              <h2>{Ammount?Ammount:'0'} $</h2>
            </b>
          </SoftBox>
        </center>
        <center>
          <SoftBox>
            <button
              onClick={openModal}
              id="copyButton"
              className="w3-button w3-hover-black w3-blue"
            >
             Withdraw your funds
            </button>
          </SoftBox>
        </center>
        <br />
        <div id="SupportModel" class="w3-modal w3-animate-opacity">
        <div
          style={{
            width: "65%",
            borderRadius: "30px",
            color: "white",
            background: " linear-gradient(to bottom right,  #71D7FC,#808EE0)",
            position: "absolute",
            top: "15%",
            left: "25%",
          }}
          class="w3-modal-content w3-card"
        >
          <span
            onClick={closeModal}
            className="w3-button w3-xlarge w3-hover-black w3-display-topright"
            title="Close SupportMadel"
          >
            X
          </span>
          <br />
          <br />
            <center>
                  <h4>
                    <b>Withdraw your Funds through</b>
                  </h4>
                  <br />
                  <form id="amountMoney" action="/api/paypalPayout" method="post">
                    <input
                      style={{ width: "60%" }}
                      name="emailPaypal"
                      placeholder="Input your paypal registered phone number"
                      className="w3-input w3-margin"
                      type="Phone"
                    />
                    <br />
                  <button  className="w3-button w3-blue w3-large">
                    with Paypal
                  </button>
                  </form>
                  
                  <br />
                  <br />
                </center>
        </div>
      </div>
      </SoftBox>
    </Card>
  );
}

export default PlatformSettings;

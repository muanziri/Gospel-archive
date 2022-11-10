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

function MonitizationSettings({showAccountPerfomance1,showSupportButton1,userId}) {
  
  const [showAccountPerfomance, setShowAccountPerfomance] = useState(showAccountPerfomance1);
  const [showSupportButton, setShowSupportButton] = useState(showSupportButton1);
  console.log(showAccountPerfomance1,showSupportButton1)
  const OppositeAccountPerformance=()=>{
    
      var NewFormData=new FormData()
      var xhr = new XMLHttpRequest();
      NewFormData.append('showAccountPerfomance',!showAccountPerfomance)
      NewFormData.append('userID',userId)
      xhr.open('POST', 'http://localhost:3001/api/ChangeshowAccountPerfomance');
      xhr.send(NewFormData);
    
   setShowAccountPerfomance(!showAccountPerfomance)
  // 
   
   }
  
   const OppositeshowSupportButton=()=>{
      var NewFormData=new FormData()
      var xhr = new XMLHttpRequest();
      NewFormData.append('showSupportButton',!showSupportButton)
      NewFormData.append('userID',userId)
      xhr.open('POST', 'http://localhost:3001/api/ChangeshowSupportButton');
      xhr.send(NewFormData);
  
    setShowSupportButton(!showSupportButton)
   }
  return (
    <>
    <Card >
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Advanced Settings
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
        <SoftBox display="flex" py={1} mb={0.25}>
          <SoftBox mt={0.25}>
            <Switch checked={showAccountPerfomance} onChange={OppositeAccountPerformance} />
          </SoftBox>
          <SoftBox width="80%" ml={2}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              Show Account Perfomace
            </SoftTypography>
          </SoftBox>
        </SoftBox> 
        {/* <SoftBox display="flex" py={1} mb={0.25}>
          <SoftBox mt={0.25}>
            <Switch checked={showSupportButton} onChange={OppositeshowSupportButton} />
          </SoftBox>
          <SoftBox width="80%" ml={2}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              Show Support Button
            </SoftTypography>
          </SoftBox>
        </SoftBox> */}
      </SoftBox>
    </Card>
    </>
  );
}

export default MonitizationSettings;
  

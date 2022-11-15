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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

function Footer() {
  let WindowWidth = window.innerWidth;
  let SizeStyle;
  if (WindowWidth < 500) {
    SizeStyle={width:'90%',position:'absolute',right:'5%' ,top:'22%' }
  }else if(
    WindowWidth < 900
  ){
    SizeStyle={width:'60%',position:'absolute',right:'10%' }
  }else if(
    WindowWidth > 900
  ){
    SizeStyle={width:'60%',position:'absolute',right:'10%' }
  }
  const displayTerms=()=>{
   document.getElementById('termsConditions').style.display='block'
  }
  const closeTerms=()=>{
   document.getElementById('termsConditions').style.display='none'
  }
  const closePrivate=()=>{
   document.getElementById('PrivatePolicy').style.display='none'
  }
  const openPrivate=()=>{
   document.getElementById('PrivatePolicy').style.display='block'
  }
  const closeAbout=()=>{
   document.getElementById('AboutUs').style.display='none'
  }
  const openAbout=()=>{
   document.getElementById('AboutUs').style.display='block'
  }
  return (<>
  <div id="termsConditions" class="w3-modal ">
  <div style={SizeStyle} class=" w3-card w3-white w3-round w3-animate-zoom">
  
  <center>
    <header style={{backgroundColor:'#17C1E8',width:'100%',color:'white',position:'absolute',left:'0%',top:'-2%',marginBottom:'100%'}}>
    <span
              onClick={closeTerms}
              className="w3-button w3-xlarge w3-hover-black w3-display-topright"
              title="Close SupportMadel"
            >
              X
            </span>
  <h1 > Terms and Conditions of Use</h1></header>
  <br/>
    <br/>
    <br/>
<h2>1. Terms</h2>

<p>By accessing this Website, accessible from www.GospelArchived.net, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>

<h2>2. Use License</h2>

<p>Permission is granted to temporarily download one copy of the materials on Gospel Archived's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>

<ul>
    <li>modify or copy the materials;</li>
    <li>use the materials for any commercial purpose or for any public display;</li>
    <li>attempt to reverse engineer any software contained on Gospel Archived's Website;</li>
    <li>remove any copyright or other proprietary notations from the materials; or</li>
    <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
</ul>

<p>This will let Gospel Archived to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. </p>

<h2>3. Disclaimer</h2>

<p>All the materials on Gospel Archived’s Website are provided "as is". Gospel Archived makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Gospel Archived does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>

<h2>4. Limitations</h2>

<p>Gospel Archived or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Gospel Archived’s Website, even if Gospel Archived or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>

<h2>5. Revisions and Errata</h2>

<p>The materials appearing on Gospel Archived’s Website may include technical, typographical, or photographic errors. Gospel Archived will not promise that any of the materials in this Website are accurate, complete, or current. Gospel Archived may change the materials contained on its Website at any time without notice. Gospel Archived does not make any commitment to update the materials.</p>

<h2>6. Links</h2>

<p>Gospel Archived has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Gospel Archived of the site. The use of any linked website is at the user’s own risk.</p>

<h2>7. Site Terms of Use Modifications</h2>

<p>Gospel Archived may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>

<h2>8. Your Privacy</h2>

<p>Please read our Privacy Policy.</p>

<h2>9. Governing Law</h2>

<p>Any claim related to Gospel Archived's Website shall be governed by the laws of Rwanda without regards to its conflict of law provisions.</p>
  </center>
  </div>
 </div>
  <div id="PrivatePolicy" class="w3-modal ">
  <div style={SizeStyle} class=" w3-card w3-white w3-round w3-animate-zoom">
  
  <center>
    <header style={{backgroundColor:'#17C1E8',width:'100%',color:'white',position:'absolute',left:'0%',top:'-2%'}}>
    <span
              onClick={closePrivate}
              className="w3-button w3-xlarge w3-hover-black w3-display-topright"
              title="Close SupportMadel"
            >
              X
            </span>
            <h1>Privacy Policy for Gospel Archived</h1></header>
  <br/>
    <br/>
    <br/>

<p>At Gospel Archived, accessible from www.GospelArchived.net, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Gospel Archived and how we use it.</p>

<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

<p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Gospel Archived. </p>

<h2>Consent</h2>

<p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

<h2>Information we collect</h2>

<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
<p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

<h2>How we use your information</h2>

<p>We use the information we collect in various ways, including to:</p>

<ul>
<li>Provide, operate, and maintain our website</li>
<li>Improve, personalize, and expand our website</li>
<li>Understand and analyze how you use our website</li>
<li>Develop new products, services, features, and functionality</li>
<li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
<li>Send you emails</li>
<li>Find and prevent fraud</li>
</ul>

<h2>Log Files</h2>

<p>Gospel Archived follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

<h2>Cookies and Web Beacons</h2>

<p>Like any other website, Gospel Archived uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>



<h2>Advertising Partners Privacy Policies</h2>

<p>You may consult this list to find the Privacy Policy for each of the advertising partners of Gospel Archived.</p>

<p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Gospel Archived, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>

<p>Note that Gospel Archived has no access to or control over these cookies that are used by third-party advertisers.</p>

<h2>Third Party Privacy Policies</h2>

<p>Gospel Archived's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>

<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>

<h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>

<p>Under the CCPA, among other rights, California consumers have the right to:</p>
<p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
<p>Request that a business delete any personal data about the consumer that a business has collected.</p>
<p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

<h2>GDPR Data Protection Rights</h2>

<p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
<p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
<p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
<p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
<p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
<p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
<p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

<h2>Children's Information</h2>

<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

<p>Gospel Archived does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
  </center>
  </div>
 </div>
 <div id="AboutUs" class="w3-modal ">
  <div style={SizeStyle} class=" w3-card w3-white w3-round w3-animate-zoom">
  
  <center>
    <header style={{backgroundColor:'#17C1E8',width:'100%',color:'white',position:'absolute',left:'0%',top:'-2%'}}>
    <span
              onClick={closeAbout}
              className="w3-button w3-xlarge w3-hover-black w3-display-topright"
              title="Close SupportMadel"
            >
              X
            </span>
            <h1>About Gospel Archived</h1></header>
  <br/>
    <br/>
    <br/>

  <p style={{padding:'3%'}}>Welcome to Gospel Archived,Your number one source for all Gospel related Video content and hosting facility. We're dedicated to giving you the very best of optimized, secured, with an emphasis on Best quality services to your folks. 
  </p>
  <p style={{padding:'3%'}}>
Founded in 2022 by Munaziri Bienaime, Gospel Archived has come a long way from its beginnings in Gasabo district, Kigali city in a village called Rindiro . When Munaziri first started out, his passion for Archiving all gospel video related content was motivated to by the support provided by the Rwanda’s Christian community. 
</p>
<p style={{padding:'3%'}}>
We now have a vision of spreading the gospel further with help of gospel related cinemas, music and other dramas. We are also looking forward to promote Christians talents in this industry by organizing different events for sharpening these talents. 

We hope you enjoy the experience on our platform. If you have any questions or comments, please don't hesitate to contact us through: email gospelarchived0@gmail.com or Phone +250790457824.
</p>
  </center>
  </div>
 </div>
    <SoftBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize="80%"
        px={1.5}
      >
      Copyright ---<b style={{fontSize:"105%"}}>Gospel Archived </b> &copy; {new Date().getFullYear()},All Rigths Reserved
      </SoftBox>
      <SoftBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
       <p> <span onClick={displayTerms} style={{ cursor:'pointer'}}>terms&Conditions    </span>
       <span onClick={openPrivate} style={{ cursor:'pointer'}}>Private Policy  </span>
        <span onClick={openAbout} style={{cursor:'pointer'}}>  about us</span></p>
      </SoftBox>
    </SoftBox>
    </>
  );
}



export default Footer;

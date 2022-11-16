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
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import VideoDispalyerChannel from "examples/Cards/BlogCards/VideoDispalyerChannel"



// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import useFetch from "react-fetch-hook"
import loading from "assets/images/Loading_2.gif";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

import { useParams } from "react-router-dom";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/Channel/components/Header";
import AccountStatus from "layouts/Channel/components/AccountStatus";


// Data


function Overview() {
  let BackendProxy='http://34.145.74.143:3001'
  let UserContent=[]
  let ChannelOwner;
  let { id } = useParams();
const InitContent = useFetch(BackendProxy+"/api/Content");
const content=InitContent.data
  const hello= useFetch(BackendProxy+"/api");
  const Users= useFetch(BackendProxy+"/api/user");
  const userData=hello.data
  const users=Users.data
  if(content){
    if(users){
   ChannelOwner=users.filter(person => person.userName == id)
    }
    if(ChannelOwner){
    UserContent.push(content.filter(person => person.userName == ChannelOwner[0].userName))}}
    

 

  // if(content){
  //   thisUserContent.push(content.filter(theFilter))
  //   content.filter(thisUserContent)
  

 


 

  const Simbi = () => {
    document.getElementById('Simbi').style.display = 'block'
    document.getElementById('SimbiL').style.display = 'none'
   
  };

  const SimbiL = () => {
    document.getElementById('Simbi').style.display = 'none'
    document.getElementById('SimbiL').style.display = 'block'
  }
 
  if(ChannelOwner){
    
      
  return (
    <DashboardLayout>
      <Header UserProfile={ChannelOwner[0].ProfilePhotoUrl} UserName={ChannelOwner[0].userName}  changeTab1={Simbi} changeTab2={SimbiL}  />
      <SoftBox mt={5} mb={3}>
        <Grid id="Simbi" style={{ display: 'none' }} container spacing={3}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-around' }}>
            <Grid style={{ marginLeft: '3%', marginBottom: '0.5%' }} item xs={12} md={6} xl={4}>
              <AccountStatus/>
            </Grid>


          </div>
        </Grid>
      </SoftBox>
      <SoftBox id="SimbiL" mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                videos 
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {content && userData?
             content.filter(person => person.userName == ChannelOwner[0].userName).map(result=>
              <Grid item xs={12} md={6} xl={3}>
                <VideoDispalyerChannel

                  image={"https://drive.google.com/uc?export=download&id="+result.VideoId}
                  category={{ color: "info", label: 'kjn'}}
                  Kategory={result.Category}
                  title={result.Title}
                  description="Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons."
                  author={{
                    image: "https://bit.ly/3kDZgRd",
                    name: "Mathew Glock",
                    date: "Posted on 28 February"
                  }}
                  authorImage={result.ProfilePhotoUrl}
                  authorName={result.userName}
                  authorDate= {result.Date}
                  Url={result.ThumbnailId}
                  duration={result.Duration}
                  action={{ type: "internal", route: "/VideoPlayerManger" }}

                />
              </Grid>
             ):
             <div  >
              <center>
             <img style={{ marginBottom: "45%" }} src={loading}></img>
           </center>
           </div>
             }
           
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
     


      <Footer />
    </DashboardLayout>
  );}
}

export default Overview;

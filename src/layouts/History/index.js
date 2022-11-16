
import Grid from "@mui/material/Grid";
//import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
//import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from 'axios'


//import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
//import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import loading from "assets/images/Loading_2.gif";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import React from "react";
import { useState, useEffect,useRef } from 'react'
import { useScroll } from "framer-motion"
import useFetch from "react-fetch-hook";
import "./index.css";


function Dashboard() {
  let BackendProxy='http://34.145.74.143:3001'
  const [userData,setUserData]=useState()
  
  useEffect(()=>{
    axios.get(BackendProxy+'/api',{withCredentials:true})
    .then(function (response) {
      setUserData(response.data);

    })
    .catch(function (error) {
      console.error(error);
    },[]);
    
  },[]);
  const jk=useFetch(BackendProxy+"/api/Content")
  const { scrollY } = useScroll()
  const [content, setContent] = useState([])
  let currentHistoryInit=[]
  let currentHistoryFinal;
  if(userData){
  if (userData.user) {
    if (userData.user !== "no user" && jk.isLoading !== true) {
      userData.user.History.map((element) => {
      
        currentHistoryInit[currentHistoryInit.length] =jk.data.filter(
          (person) => person.ThumbnailId == element
        )[0];
      
    });}}}

  const CloseMessage = () => {
    document.getElementById('messagesPushed').style.display = 'none'
  }
  const changeTheDateFormat = (n) => {
    let date = new Date(n);
    let newFormat = date.toUTCString();
    return newFormat;
  };
  if(userData){
    if (userData.user) {
      if (userData.user !== "no user") {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}></Grid>
            <Grid item xs={12} lg={5}></Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} id="wrapper" >
            {currentHistoryInit.length>0 && jk.isLoading !== true ? (
                currentHistoryInit.map((element, key) => (
                  <Grid
                    key={key}
                    style={{ width: "400px", marginBottom: "10px", marginLeft: "10px" }}
                  >
                    <DefaultBlogCard
                      image={element.VideoId}
                      categoryName={element.Category}
                      category={{ color: "info", label: "short" }}
                      title={element.Title}
                      followers={""}
                      views={element.Views}
                      Duration={element.Duration}
                      likes={element.Likes.length}
                      VideoId={element.ThumbnailId}
                      channelUrl={"/Channel/"+element.userName}
                      authorDate={changeTheDateFormat(element.Date)}
                      authorImage={element.ProfilePhotoUrl}
                      authorName={element.userName}
                      author={{
                        image: "https://bit.ly/3kDZgRd",
                        name: "Mathew Glock",
                        date: "Posted on 28 February",
                      }}
                      action={{ type: "internal", route: "/videop" }}
                    />
                  </Grid>
                ))
            ) : (
              <Grid item xs={12} lg={5}>
                <center>
                 <h6>No Videos you watched in the past</h6>
                </center>
              </Grid>
            )}
          </div>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );}else{
    return(
      <DashboardLayout>
        <DashboardNavbar />
     <div id='messagesPushed' className="w3-red w3-card w3-animate-bottom w3-padding w3-margin">
     <button  onClick={CloseMessage} className="w3-button w3-round-large w3-hover-red w3-display-topright">X</button>
       <center><p>Login to have to access your History</p></center>
       </div>
       </DashboardLayout>)
  }}}
}

export default Dashboard;

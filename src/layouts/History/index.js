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

// @mui material components
import Grid from "@mui/material/Grid";
//import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
//import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

//import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
//import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import loading from "assets/images/Loading_2.gif";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import React from "react";
import { useState, useEffect,useRef } from 'react'
import { useScroll } from "framer-motion"
import useFetch from "react-fetch-hook";
import "./index.css";
//import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
//import typography from "assets/theme/base/typography";

// Dashboard layout components
//import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
//import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
//import Projects from "layouts/dashboard/components/Projects";
//import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data

//import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Dashboard() {
  let BackendProxy='http://localhost:3001'
  const [userData,setUserData]=useState()
  
  useEffect(()=>{
    fetch("/api",{
      method:'GET',
      credentials : 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((results)=>{return results.json()})
    .then((results)=>{setUserData(results);})
  });
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
 // const { data } = useFetch("/api/Content");
 /// const content = data;
  // const {hasMore,setHasMore}=useState(true);
  // const {page,setPage}=useState(1);
  //   //const { size } = typography;
  //   //const { chart, items } = reportsBarChartData;
  //   // const fetchMoreData = () => {
  //   //   if (content.length >= 2) {
  //   //     setHasMore(false);
  //   //     return;
  //   //   }
  //   //   // a fake async api call like which sends
  //   //   // 20 more records in .5 secs
  //   //   setTimeout(() => {
  //   //     this.setState({
  //   //       items: this.state.items.concat(Array.from({ length: 20 }))
  //   //     });
  //   //   }, 500);
  //   // };
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

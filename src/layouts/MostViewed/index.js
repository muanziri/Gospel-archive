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
import InfiniteScroll from "react-infinite-scroll-component";
//import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import backendProxy from "BackendProxy";
import { Link } from "react-router-dom";
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
import offline from "assets/images/offline.webp";

import {
  useSoftUIController,
  setMiniSidenav
} from "context";
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

function MostViews() {
  let WindowWidth = window.innerWidth;
  const [userData, setUserData] = useState();
  useEffect(() => {
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

 
  
  const [isOnline, setIsOnline] = useState(true);
  window.addEventListener('online', () => {setIsOnline(true)});
window.addEventListener('offline', () => {setIsOnline(false)});
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav} = controller;
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const menuToggle =()=>{
    document.getElementById('menuToggle').style.display='block'
    document.getElementById('menuToggleButton').style.display='none'
    document.getElementById('menuToggleClose').style.display='block'
  }
  const menuToggleClose =()=>{
    document.getElementById('menuToggle').style.display='none'
    document.getElementById('menuToggleButton').style.display='block'
    document.getElementById('menuToggleClose').style.display='none'
  }
  const OpenContentModal = () => {
    document.getElementById("ContentEditor1").style.display = "block";
  };
  //let backendProxy='http://34.145.74.143:3001';
  const [count, setCount] = useState(Math.floor(Math.random() * 2)+1);
  const [content, setContent] = useState([])
  useEffect(() => {
    setCount(() => count * 1);
    fetchData()
  }, [count])
 
 function fetchData() {
   fetch(backendProxy+'/api/Content/mostViews/'+count)
   .then((api)=>api.json())
   .then((apijson)=>{
    setContent([...content,...apijson])
  })
    
    //console.log(content)
  }
 

  
  const changeTheDateFormat = (n) => {
    let date = new Date(n);
    let newFormat = date.toUTCString();
    return newFormat;
  };
 if(isOnline == true){
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
            {content   ? (
               <InfiniteScroll
               dataLength={content.length} //This is important field to render the next data
               next={fetchData}
               hasMore={true}
               loader={<center><img src={loading} style={{width:'5%'}}></img></center>}
               >
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} id="wrapper" >
    
               { content.map((element, key) => (
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
                ))}
                </div>
                </InfiniteScroll>
            ) : (
              <Grid item xs={12} lg={5}>
                <center>
                  <img style={{ marginBottom: "45%" }} src={loading}></img>
                </center>
              </Grid>
            )}
        </SoftBox>
      </SoftBox>
      <div id='menuToggle' className="w3-animate-bottom" style={{width:'30px',height:'100px',display:'none',borderRadius:'2%', backgroundColor:'white', position:'fixed',bottom:'5%',right:'2.5%'}}>
     {userData?userData.user !== 'no user'?<Link to="/profile"><i onClick={OpenContentModal} style={{fontSize:'100%',margin:'10%'}} class="fa-solid fa-circle-user"></i></Link>:<i onClick={OpenContentModal} style={{fontSize:'100%',margin:'10%'}} class="fa-solid fa-circle-user"></i>:<i style={{fontSize:'100%',margin:'10%'}} class="fa-solid fa-circle-user"></i>}
    <br/>
    <i style={{fontSize:'100%',margin:'10%'}} class="fa-solid fa-bell"></i>
    <br/>
    <i onClick={handleMiniSidenav} style={{fontSize:'100%',margin:'10%'}} class="fa-solid fa-bars"></i>
    </div>
    {WindowWidth<500?
    <div id='menuToggleButton' onClick={menuToggle} style={{width:'30px',height:'30px',borderRadius:'50%',display:'block', backgroundColor:'#344767', position:'fixed',bottom:'1%',right:'3%'}}>
    <center><i style={{fontSize:'100%',margin:'2%',color:'white'}} class="fa-solid fa-ellipsis-vertical"></i></center>
       </div>:''}
    <div id='menuToggleClose' onClick={menuToggleClose} style={{width:'30px',height:'30px',borderRadius:'50%',display:'none', backgroundColor:'#344767', position:'fixed',bottom:'1%',right:'3%'}}>
    <center><p style={{fontSize:'100%',margin:'2%',color:'white'}} > &times;</p></center>
       </div>
      <Footer />
    </DashboardLayout>
  );}else{
    return (
      <DashboardLayout>
        <center><img style={{ width: "20%" }} src={offline}></img></center>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default MostViews;

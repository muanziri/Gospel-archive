
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import backendProxy from "BackendProxy";

import loading from "assets/images/Loading_2.gif";
import offline from "assets/images/offline.png";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import React from "react";
import { useState, useEffect,useRef } from 'react'
import {
  useSoftUIController,
  setMiniSidenav
} from "context";
import { useScroll } from "framer-motion"
import "./index.css";

function Testmony() {
  
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
  const [count, setCount] = useState(Math.floor(Math.random() * 2)+1);
  const [calculation, setCalculation] = useState(1);
  //let backendProxy='http://34.145.74.143:3001'
  const [content, setContent] = useState([])
  useEffect(() => {
    setCount(() => count * 1);
    fetchData()
  }, [count])
    const ChangeNegative =()=>{
    setCalculation((c) => c - 1)
    setCount((c) => c - 1)
    if(count >=1)
      {document.getElementById('pageNumber').innerHTML=calculation

    }else{
        document.getElementById('changeNegativeBtn').style.display='none'
      }
  }
  const ChangePagePositive =()=>{
    setCalculation((c) => c + 1)
    setCount((c) => c + 1)
    document.getElementById('pageNumber').innerHTML=calculation;
  }
  async function fetchData() {
    let api = await fetch(backendProxy+'/api/Content/testmonies/'+count);
    let apijson = await api.json()
    setContent(apijson)
    console.log(content)
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
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} id="wrapper" >
            {content   ? (
                content.map((element, key) => (
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
                  <img style={{ marginBottom: "45%" }} src={loading}></img>
                </center>
              </Grid>
            )}
          </div>
        </SoftBox>
      </SoftBox>
      <center>
      <div >
        <button onClick={ChangeNegative} id='changeNegativeBtn' className="w3-button w3-blue ">-</button>
        <button id='pageNumber' className="w3-button w3-white ">{calculation}</button>
        <button onClick={ChangePagePositive} className="w3-button w3-blue ">+</button>
      </div>
      </center>
      <Footer />
    </DashboardLayout>
  );}else{
    return(
      <DashboardLayout>
         
        <center><img src={offline} style={{width:'50%'}}></img>
               <h1>You are offline</h1>
        </center>
    
      </DashboardLayout>)
  }
}

export default Testmony;


import Grid from "@mui/material/Grid";

import SoftBox from "components/SoftBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import offline from "assets/images/offline.webp";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import backendProxy from "BackendProxy";
import {
  useSoftUIController,
  setMiniSidenav
} from "context";

import loading from "assets/images/Loading_2.gif";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import React from "react";
import { useState, useEffect,useRef } from 'react'
import "./index.css";


function Songs() {
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
  const [count, setCount] = useState(Math.floor(Math.random() * 2)+1);
  const [content, setContent] = useState([])
  useEffect(() => {
    setCount(() => count * 1);
    fetchData()
  }, [count])
  
  const OpenContentModal = () => {
    document.getElementById("ContentEditor1").style.display = "block";
  };
  async function fetchData() {
    let api = await fetch(backendProxy+'/api/Content/Songs/'+count);
    let apijson = await api.json()
    setContent(apijson)

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
    return(
      <DashboardLayout>
         
        <center><img src={offline} style={{width:'50%'}}></img>
               <h1>You are offline</h1>
        </center>
    
      </DashboardLayout>)
  }
}

export default Songs;

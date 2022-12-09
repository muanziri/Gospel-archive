
import Grid from "@mui/material/Grid";
import backendProxy from "BackendProxy";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import InfiniteScroll from "react-infinite-scroll-component";

import loading from "assets/images/Loading_2.gif";

import React, { useRef } from "react";
import { useState, useEffect } from 'react'
import {
  useSoftUIController,
  setMiniSidenav
} from "context";
import { useScroll } from "framer-motion"
import {  Link } from "react-router-dom";
import { lazy,Suspense } from 'react'
const Footer= lazy(()=>import("examples/Footer"))
const DashboardNavbar= lazy(()=>import("examples/Navbars/DashboardNavbar"));
const offline= lazy(()=>import("assets/images/offline.webp"))
const DefaultBlogCard= lazy(()=>import("examples/Cards/BlogCards/DefaultBlogCard"))


function Dashboard() {

  const [isOnline, setIsOnline] = useState(true);
  window.addEventListener('online', () => {setIsOnline(true)});
window.addEventListener('offline', () => {setIsOnline(false)});
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

  const OpenContentModal = () => {
    document.getElementById("ContentEditor1").style.display = "block";
  };
  const [count, setCount] = useState(Math.floor(Math.random() * 2)+1);
  const [calculation, setCalculation] = useState(1);
  const [controller, dispatch] = useSoftUIController();
    const { scrollY } = useScroll()
  const [content, setContent] = useState([])

  const { miniSidenav} = controller;
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
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

  const ChangePagePositive =()=>{
    setCalculation((c) => c + 1)
    setCount((c) => c + 1)
    document.getElementById('pageNumber').innerHTML=calculation;
  }
  async function fetchData() {
    let api = await fetch(backendProxy+'/api/Content/'+count);
    let apijson = await api.json()
    setContent([...content,...apijson])
  }

  let WindowWidth = window.innerWidth;


  const changeTheDateFormat = (n) => {
    let date = new Date(n);
    let newFormat = date.toUTCString();
    return newFormat;
  };
  if(isOnline == true){
  return (
    <DashboardLayout>
      <Suspense
      fallback={<center><img src={loading} style={{width:'20%'}}></img></center>}
      >
      <DashboardNavbar />
      </Suspense>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}></Grid>
            <Grid item xs={12} lg={5}></Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
            {content  && content.length>0 ? (
              <InfiniteScroll
              dataLength={content.length} //This is important field to render the next data
              next={fetchData}
              hasMore={true}
              loader={<center><img src={loading} style={{width:'5%'}}></img></center>}
              >
               <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} id="wrapper" >

              {  content.map((element, key) => (
                  <Grid
                    key={key}
                    style={{ width: "400px", marginBottom: "10px", marginLeft: "10px" }}
                  >
                    <Suspense
                    fallback={<center><img src={loading} style={{width:'30%'}}></img></center>}
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
                    </Suspense>
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
      <Suspense
      fallback={<center><img src={loading} style={{width:'20%'}}></img></center>}
      >
      <Footer />
      </Suspense>
    </DashboardLayout>
  );}else{
    return(
    <DashboardLayout>
       
       <Suspense
       fallback={<center><img src={loading} style={{width:'50%'}}></img></center>}
       >
      <center><img src={offline} style={{width:'50%'}}></img>
             <h1>You are offline</h1>
      </center>
      </Suspense>

    </DashboardLayout>)
  }
}

export default Dashboard;

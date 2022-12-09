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
import "./index.css";
// @mui material components
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import {lazy,Suspense} from "react"
import SoftTypography from "components/SoftTypography";

import loading from "assets/images/Loading_2.gif";
import Logo from "assets/images/logo67.webp";
import backendProxy from "BackendProxy";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from 'axios'

import React, { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faDownload, faShare, faEye } from "@fortawesome/free-solid-svg-icons";
import SoftAvatar from "components/SoftAvatar";

import { useRef } from "react";

import {
  useSoftUIController,
  setMiniSidenav
} from "context";

const Footer = lazy(()=>import('examples/Footer'))
const offline = lazy(()=>import("assets/images/offline.webp"))
const DashboardNavbar = lazy(()=>import("examples/Navbars/DashboardNavbar"))
const DefaultBlogCard = lazy(()=>import("examples/Cards/BlogCards/DefaultBlogCardSide"))
const DefaultBlogCarda = lazy(()=>import("examples/Cards/BlogCards/DefaultBlogCard"))



function VideoPlayer({ likes, followers, views }) { 
  const [isOnline, setIsOnline] = useState(true);
  const [currentVideoPlayed,setCurrentVideoPlayed]=useState([])
  window.addEventListener('online', () => {setIsOnline(true)});
window.addEventListener('offline', () => {setIsOnline(false)});
  const [count,setCount]=useState(Math.floor(Math.random() * 2)+1)
  const [content,setContent]=useState()
  //let backendProxy='http://34.145.74.143:3001'
  const [userData,setUserData]=useState();
  useEffect(()=>{
    axios.get(backendProxy+'/api',{withCredentials:true})
    .then(function (response) {
      setUserData(response.data);
    
    })
    .catch(function (error) {
      console.error(error);
    });},[])
 
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav} = controller;
  const changeTheDateFormat = (n) => {
    let date = new Date(n);
    let newFormat = date.toUTCString();
    return newFormat;
  };
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const [actualComments, setActualComments] = useState([]);
  const displayComments=()=>{
    document.getElementById('CommentsDisplay').style.display='block'
  }
  const displayCommentsClosed=()=>{
    document.getElementById('CommentsDisplay').style.display='none'
  }
  async function fetchCommentData() {
    let api = await fetch(backendProxy+"/api/commentPool");
    let apijson = await api.json();
    setActualComments(apijson);
  }
  useEffect(() => {
    fetchCommentData();
  }, []);
  async function fetchData() {
    let api = await fetch(backendProxy+'/api/Content/'+count);
    let apijson = await api.json()
    setContent(apijson)
   
  }
  async function fetchCurrentVid() {
    let api = await fetch(backendProxy+'/api/CurrentVideo/'+id);
    let apijson = await api.json()
    setCurrentVideoPlayed(apijson)
   
   
  }
  useEffect(() => {
    fetchCurrentVid()
    setCount(() => count * 1);
    fetchData()
  }, [count])

 


  const CommentsDisplay = [];

  const comment = useFetch(backendProxy+"/api/commentPool");
  const comments = comment.data;

  let theUrl = "https://drive.google.com/uc?export=download&id=";
  let { id } = useParams();

  let  source= theUrl+id
  
  const videoRef = useRef();

  useEffect(() => {    
    
    videoRef.current.videoEl.load()
    num.current=0
  }, [source]);
  let CommentsOnThisPost = [];
  let num = useRef(0);
  let shareIt = window.location.href;
  let currentVideo;
  let init;
  let WindowWidth = window.innerWidth;
  let VidplayerStyle;
  let CommentStyle;
  let ContentDisplay;
  let IngagmentBTNStyle;
  let AvartaStyle;
  let AccountInfo;
  const whatsappShareRedirec=()=>{
    let link='https://wa.me/?text='+shareIt+''
   window.open(link);
  }
  const twitterShareRedirec=()=>{
    let link='https://twitter.com/intent/tweet?url='+shareIt+''
    window.open(link);
  }
  const telegramShareRedirec=()=>{
    let link='https://t.me/share/url?url='+shareIt+''
    window.open(link);
  }
  if (content) {
    currentVideo = currentVideoPlayed.CurrentVid

    if(currentVideo){
    init = 0 + currentVideo.Likes.length;
    if (comments) {
      let commentsIds = currentVideo.CommentsIds;
      CommentsDisplay.push(actualComments);

      if (actualComments) {
        //ActualComments.push(CommentsDisplay[0].comments)

        if (commentsIds) {
          commentsIds.map((element) => {
            if (actualComments) {
              CommentsOnThisPost[CommentsOnThisPost.length] = actualComments.comments.filter(
                (person) => person._id == element
              )[0];
            }
          });
        }
      }
    }}
  }
  if (WindowWidth < 500) {
    AccountInfo = { position: "absolute", top: "72%", right: "15%" };
    AvartaStyle = { marginTop: "20%", zIndex: "-2" };
    VidplayerStyle = { width: "100vw", marginTop:'0%',marginLeft: "0%", indexZ: "2" };
    IngagmentBTNStyle = { display: "none" };
    ContentDisplay = {
      width: "100%",
      height:'520px',
      backgroundColor:'white',
      border:'none',
      
      
      // display:'none',
      position: "absolute",
     left:'0%',
      top: "110%",
    
    };
    CommentStyle = {
      width: "60%",
      
      border:'none',
      color:'white',
      borderRadius:'5px',
      backgroundColor:'#2196F3',
      border:'none',
      color:'white',
      borderRadius:'5px',
      // display:'none',
      position: "absolute",
      left: "17.5%",
      top: "100%",
    };
  } else if (WindowWidth < 900) {
    AccountInfo = { position: "absolute", bottom: "7%", right: "18%" };
    AvartaStyle = { position: "absolute", right: "10%", top: "78%" };
    VidplayerStyle = { width: "95vw", marginLeft: "0%" };
    IngagmentBTNStyle = { width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" };
    CommentStyle = {
      width: "23%",
      backgroundColor:'#2196F3',
      border:'none',
      color:'white',
      borderRadius:'5px',
      // display:'none',
      position: "absolute",
      right: "3%",
      top: "95%",
    
    };
    ContentDisplay = {
      width: "100%",
      height:'520px',
      backgroundColor:'white',
      border:'none',
      overflowY:'scroll',
      display: "flex", 
      flexDirection: "row",
       flexWrap: "wrap" ,
      // display:'none',
      position: "absolute",
      right: "0%",
      top: "100%",
    
    };
  } else if (WindowWidth > 900) {
    AccountInfo = { position: "absolute", bottom: "7%", right: "38%" };
    AvartaStyle = { position: "absolute", right: "30%", top: "78%" };
    VidplayerStyle = { width: "55vw", marginLeft: "4%" };
    IngagmentBTNStyle = { width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" };
    CommentStyle = {
      width: "23%",
      backgroundColor:'#2196F3',
      border:'none',
      color:'white',
      borderRadius:'5px',
      // display:'none',
      position: "absolute",
      right: "3%",
      top: "15%",
    
    };
    ContentDisplay = {
      width: "23%",
      height:'520px',
      backgroundColor:'white',
      border:'none',
      overflowY:'scroll',
     
      // display:'none',
      position: "absolute",
      right: "3%",
      top: "19%",
    
    };
  }

  
  
  const onClickAddLike = () => {
    var NewFormData = new FormData();
    var xhr = new XMLHttpRequest();
    document.getElementById("addLike").innerText = init + 1;
    if (userData.user) {
      if (userData.user !== "no user") {
        NewFormData.append("user", userData.user._id);
        NewFormData.append("FolderId", userData.user.folderId);
        NewFormData.append("videoId", id);

        xhr.open("POST", backendProxy+"/api/addLike");
        xhr.send(NewFormData);
      } else {
        alert("you are not logged in");
      }
    }
    setTimeout(() => {
      document.getElementById("clickButton").disabled = "true";
    }, 500);
  };

  
  const onClickViews = () => {
    var NewFormData = new FormData();
    var xhr = new XMLHttpRequest();
    NewFormData.append("videoId", id);

    xhr.open("POST", backendProxy+"/api/addViews");
    xhr.send(NewFormData);
  };
  const sharePopUp = () => {
    document.getElementById("sharePopPup").style.display = "flex";
  };
  const copyTheLink = () => {
    document.getElementById("copyText").style.color = "green";
    document.getElementById("copyButton").innerText = "copied";
    navigator.clipboard.writeText(document.getElementById("copyText").value);
  };
  const closeWarning = () => {
    document.getElementById("warningComment").style.display = "none";
  };
  const openSupportModelPayment = () => {
    document.getElementById("SupportModel").style.display = "block";
  };
  const closeSupportModelPayment = () => {
    document.getElementById("SupportModel").style.display = "none";
  };
  const redirectFunc1 = (e) => {
    e.preventDefault();
    var NewFormData = new FormData();
    var xhr = new XMLHttpRequest();

    NewFormData.append("comment", document.getElementById("CommentInput").value);

    // NewFormData.append('user',JSON.stringify(userData))
    xhr.open("POST", backendProxy+"/api/addComment");
    xhr.send(NewFormData);
  };


  const redirectFunc = (e) => {
    e.preventDefault();
    var NewFormData = new FormData();
    var xhr = new XMLHttpRequest();
    if (document.getElementById("CommentInput").value == "") {
      document.getElementById("warningComment").style.display = "block";
    } else {
      let commentsList = document.getElementById("commentsList");
      let divWrapper = document.createElement("div");
      divWrapper.style.width = "90%";
      divWrapper.style.marginTop = "20px";
      divWrapper.className = "w3-card-4 w3-animate-top";
      let divWrapper2 = document.createElement("div");
      divWrapper2.appendChild(document.createElement("br"));
      divWrapper2.style.fontSize = "10px";
      divWrapper2.className = "w3-container";
      let img = document.createElement("img");
      img.style.width = "20%";
      img.src = userData.user.ProfilePhotoUrl;
      img.className = "w3-left w3-circle w3-margin-right";
      divWrapper2.appendChild(img);
      let h6 = document.createElement("h6");
      h6.innerText = userData.user.userName;
      divWrapper2.appendChild(h6);
      let h5 = document.createElement("h5");
      h5.innerHTML = document.getElementById("CommentInput").value;
      h5.style.fontWeight = "bold";
      divWrapper2.appendChild(document.createElement("br"));
      divWrapper2.appendChild(h5);
      divWrapper.appendChild(divWrapper2);
      commentsList.insertBefore(divWrapper, commentsList.firstChild);
      setTimeout(() => {
        document.getElementById("CommentInput").value = "";
      }, 500);
      if (userData.user) {
        if (userData.user !== "no user") {
          NewFormData.append("comment", document.getElementById("CommentInput").value);
          NewFormData.append("VideoId", id);
          NewFormData.append("userProfile", userData.user.ProfilePhotoUrl);
          NewFormData.append("UserName", userData.user.userName);

          xhr.open("POST", backendProxy+"/api/addComment");
          xhr.send(NewFormData);
        } else {
          alert("you are not logged in");
        }
      }
    }
  };
 




  
 if(isOnline == true){
  return (
    <>
      <DashboardLayout>
    
     { WindowWidth < 500 ?<div style={{backgroundColor:'Black',position:'relative',marginTop:'-8%',marginLeft:'-8%',width:'116%',height:'25%'}}><img style={{width:'10%',height:'5%',marginLeft:'2%'}} src={Logo}></img><b style={{color:'#17C1E8'}}> Gospel Archived</b><i onClick={handleMiniSidenav} style={{color:'#17C1E8',marginTop:'3%',position:'relative',left:"40%"}} class="fa-solid fa-bars"></i></div>:<Suspense fallback={<center><img src={loading} style={{width:'20%'}}></img></center>}><DashboardNavbar/></Suspense>}
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid>
                <div style={VidplayerStyle}>
                  <Video  ref={videoRef}  controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                  autoPlay="true"
                 
                  onTimeUpdate={()=>{
                    let lop = num.current++;
                    if (lop == 20) {
              
                      onClickViews();
                    }
                  }}
                   >
                  
                     <source  src={source} type="video/mp4" />
                    </Video>
                </div>
              </Grid>
            </Grid>
          </SoftBox>
        </SoftBox>

       {WindowWidth>500? <div
          id="sharePopPup"
          style={{ flexDirection: "row", width: "fit-content", display: "none" }}
          className="w3-card w3-round w3-animate-up"
        >
          <input type="text" id="copyText" disabled value={shareIt} />
          <button
            id="copyButton"
            onClick={copyTheLink}
            className="w3-button w3-mobile w3-hover-black w3-blue"
          >
            copy
          </button>
          <i onClick={whatsappShareRedirec} style={{fontSize:'250%',color:'#2196F3',marginLeft:'5px',cursor:'pointer'}} class="fa-brands fa-square-whatsapp"></i>
          <i  onClick={twitterShareRedirec} style={{fontSize:'250%',color:'#2196F3',marginLeft:'5px',cursor:'pointer'}}  class="fa-brands fa-square-twitter"></i>
          <i  onClick={telegramShareRedirec} style={{fontSize:'250%',color:'#2196F3',marginLeft:'2px',marginRight:'4px',cursor:'pointer'}} class="fa-brands fa-telegram"></i>
          <i  style={{fontSize:'250%',color:'#2196F3',marginLeft:'2px',marginRight:'4px',cursor:'pointer'}} class="fa-solid fa-square-envelope"></i>
        </div>:<div
          id="sharePopPup"
          style={{ flexDirection: "row",position:'absolute',top:'58%',left:'1%', width: "300px",overflowX: "scroll",scrollbarWidth:'2px', display: "none" }}
          className="w3-card w3-round w3-animate-up"
        >
          <input type="text" id="copyText" disabled value={shareIt} />
          <i   onClick={copyTheLink} style={{fontSize:'250%',color:'#2196F3',marginLeft:'2px'}} class="fa-solid fa-clipboard"></i>
          <i onClick={whatsappShareRedirec} style={{fontSize:'250%',color:'#2196F3',marginLeft:'5px'}} class="fa-brands fa-square-whatsapp"></i>
          <i onClick={twitterShareRedirec} style={{fontSize:'250%',color:'#2196F3',marginLeft:'5px',cursor:'pointer'}}  class="fa-brands fa-square-twitter"></i>
          <i onClick={telegramShareRedirec} style={{fontSize:'250%',color:'#2196F3',marginLeft:'2px',marginRight:'4px',cursor:'pointer'}} class="fa-brands fa-telegram"></i>
          <i  style={{fontSize:'250%',color:'#2196F3',marginLeft:'2px',marginRight:'4px',cursor:'pointer'}} class="fa-solid fa-square-envelope"></i>
        
        </div>}
        {currentVideo ? (
          <>
            <h4 style={WindowWidth>500?{width:'60%'}:{width:'100%'}}>{currentVideo?currentVideo.Title:''}</h4>
            <SoftBox style={AvartaStyle} display="flex" alignItems="center" mt={3}>
              <SoftAvatar src={currentVideo? currentVideo.ProfilePhotoUrl:''} variant="rounded" shadow="md" />
              <SoftBox pl={2} lineHeight={0}>
                <SoftTypography component="h6" variant="button" fontWeight="medium" gutterBottom>
                  {currentVideo?currentVideo.userName:''}
                </SoftTypography>
                <SoftTypography variant="caption" color="text">
                  {currentVideo?currentVideo.Date:''}
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftTypography style={AccountInfo} variant="caption" color="text">
              <b>Views</b> <b>{currentVideo?currentVideo.Views:''}</b>
              
              <br />
              <b>likes</b> <b>{currentVideo?currentVideo.Likes.length:''}</b>
            </SoftTypography>
          </>
        ) : (
          <div>
           
          </div>
        )}
        <div className="w3-margin-top" style={IngagmentBTNStyle}>
          <button
            id="clickButton"
            onClick={onClickAddLike}
            className="w3-button  w3-hover-black w3-blue w3-round w3-margin-left"
          >
            <FontAwesomeIcon style={{ color: "#ffff" }} icon={faThumbsUp} /> Like
            <div id="addLike">{init}</div>
          </button>
          <button
            onClick={sharePopUp}
            className="w3-button  w3-hover-black w3-blue w3-round w3-margin-left"
          >
            <FontAwesomeIcon style={{ color: "#ffff" }} icon={faShare} /> Share
          </button>
          <div style={{ cursor: "none" }} className="w3-button  w3-white w3-round w3-margin-left">
            <FontAwesomeIcon style={{ color: "#2196F3" }} icon={faEye} /> Views
            <div id="addLike" style={{ color: "#2196F3" }}>
              { currentVideo && currentVideo ? currentVideo.Views : "Loading ..."}
            </div>
          </div>
          {currentVideo && currentVideo ? (
            currentVideo.showDownloadButton == true ? (
              <a href={source}><button  className="w3-button w3-hover-black w3-blue w3-round w3-margin-left">
                <FontAwesomeIcon style={{ color: "#ffff" }} icon={faDownload} />
                Download
              </button></a>
            ) : (
              <button
                style={{ display: "none" }}
                className="w3-button w3-hidden w3-hover-black w3-blue w3-round w3-margin-left"
              >
                <FontAwesomeIcon style={{ color: "#ffff" }} icon={faDownload} />
                Download
              </button>
            )
          ) : (
            <button
              style={{ display: "none" }}
              className="w3-button  w3-hover-black w3-blue w3-round w3-margin-left"
            >
              <FontAwesomeIcon style={{ color: "#ffff" }} icon={faDownload} />
              Download
            </button>
          )}
        </div>
        {WindowWidth > 500 ? (
          <div
            style={{
              display: "none",
              backgroundColor: "black",
              width: "150%",
              overflowX: "scroll",
              marginTop: "2%",
            }}
          >
            <b />
            <button
              id="clickButton"
              onClick={onClickAddLike}
              className="w3-button  w3-hover-black w3-blue w3-round "
            >
              <FontAwesomeIcon style={{ color: "#ffff" }} icon={faThumbsUp} /> Like {init}
            </button>
            <button onClick={sharePopUp} className="w3-button  w3-hover-black w3-blue w3-round ">
              <FontAwesomeIcon style={{ color: "#ffff" }} icon={faShare} /> Share
            </button>
            <div style={{ cursor: "none" }} className="w3-button  w3-white w3-round ">
              <FontAwesomeIcon style={{ color: "#2196F3" }} icon={faEye} /> Views
              {currentVideo && currentVideo ? currentVideo.Views : "Loading ..."}
            </div>
            {/* <button
                        onClick={openSupportModelPayment}
                        className="w3-button w3-hover-black w3-blue w3-round w3-margin-left"
                      >
                        <FontAwesomeIcon style={{ color: "#ffff" }} icon={faMoneyCheckDollar} />{" "}
                        Support
                      </button> */}

            {currentVideo && currentVideo ? (
              currentVideo.showDownloadButton == true ? (
                <center>
                 <a href={source} className="w3-button w3-hover-black w3-blue w3-round w3-margin-left"> <button >
                    <FontAwesomeIcon style={{ color: "#ffff" }} icon={faDownload} />
                    Download
                  </button></a>
                </center>
              ) : (
                <center>
                 <a><button
                    style={{ display: "none" }}
                    className="w3-button w3-hidden w3-hover-black w3-blue w3-round w3-margin-left"
                  >
                    <FontAwesomeIcon style={{ color: "#ffff" }} icon={faDownload} />
                    Download
                  </button></a> 
                </center>
              )
            ) : (
              <center>
                <a><button
                  style={{ display: "none" }}
                  className="w3-button  w3-hover-black w3-blue w3-round w3-margin-left"
                >
                  <FontAwesomeIcon style={{ color: "#ffff" }} icon={faDownload} />
                  Download
                </button></a>
              </center>
            )}
          </div>
        ) : (
          <div style={{ display: "block", marginTop: "2%" }}>
            <b />
            <button
              id="clickButton"
              onClick={onClickAddLike}
              className="w3-button  w3-hover-black w3-blue w3-round w3-margin-top w3-margin-left"
            >
              <FontAwesomeIcon style={{ color: "#ffff" }} icon={faThumbsUp} />
              <span></span> {init}
            </button>
            <button
              onClick={sharePopUp}
              className="w3-button  w3-hover-black w3-blue w3-round w3-margin-top w3-margin-left"
            >
              <FontAwesomeIcon style={{ color: "#ffff" }} icon={faShare} />
            </button>
            <div
              style={{ cursor: "none" }}
              className="w3-button  w3-white w3-round w3-margin-top w3-margin-left"
            >
              <FontAwesomeIcon style={{ color: "#2196F3" }} icon={faEye} />
              <span></span> {currentVideo && currentVideo? currentVideo.Views : "Loading ..."}
            </div>
            {/* <button
                    onClick={openSupportModelPayment}
                    className="w3-button w3-hover-black w3-blue w3-round w3-margin-left"
                  >
                    <FontAwesomeIcon style={{ color: "#ffff" }} icon={faMoneyCheckDollar} />{" "}
                    Support
                  </button> */}

            {currentVideo && currentVideo ? (
              currentVideo.showDownloadButton == true ? (
                <a href={source}><button className="w3-button w3-hover-black w3-blue w3-margin-top w3-round w3-margin-left">
                  <FontAwesomeIcon style={{ color: "#ffff" }} icon={faDownload} />
                </button></a>
              ) : (
                <button
                  style={{ display: "none" }}
                  className="w3-button w3-hidden w3-margin-top w3-hover-black w3-blue w3-round w3-margin-left"
                >
                  <FontAwesomeIcon style={{ color: "#ffff" }} icon={faDownload} />
                </button>
              )
            ) : (
              <button
                style={{ display: "none" }}
                className="w3-button  w3-hover-black w3-margin-top w3-blue w3-round w3-margin-left"
              >
                <FontAwesomeIcon style={{ color: "#ffff" }} icon={faDownload} />
              </button>
            )}
          </div>
        )}
        <button  onClick={displayComments} style={CommentStyle}>comments</button>
        <div style={ContentDisplay}> 
        {content   ? (
                content.map((element, key) => (
                  <Grid
                    key={key}
                    style={WindowWidth < 500?{ width: "90%", marginBottom: "10px", marginLeft: "10px" }:WindowWidth < 900?{ width: "45%", marginBottom: "10px", marginLeft: "10px" }:{ width: "90%", marginBottom: "10px", marginLeft: "10px" }}
                  >
                    {WindowWidth < 500?
                    <Suspense>
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
                    :WindowWidth < 900?
                    <Suspense fallback={<center><img src={loading} style={{width:'20%'}}></img></center>}>
                    <DefaultBlogCarda
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
                  :
                  <Suspense fallback={<center><img src={loading} style={{width:'20%'}}></img></center>}>
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
                /></Suspense>}
                  </Grid>
                ))
            ) : (
              <Grid item xs={12} lg={5}>
                <center>
                  <img style={{ marginBottom: "45%" }} src={loading}></img>
                </center>
              </Grid>
            )}</div>
        <div id="CommentsDisplay" className="w3-modal w3-animate-opacity">
        <div style={{width:'30%',borderRadius:'20px'}} className="w3-modal-content w3-card ">
        <span
              onClick={displayCommentsClosed}
              style={{borderRadius:'20px'}}
              className="w3-button w3-xlarge w3-hover-blue w3-display-topright"
              title="Close Comments"
            >
              X
            </span>
          <h4 style={{ position:'absolute',left:'2%',top:'3%',marginBottom:'0%' }}>
            <b>Comments </b>
          </h4>

          <div id="warningComment" style={{ display: "none" }} className="w3-panel w3-red ">
            No empty comment
            <button onClick={closeWarning} className="w3-button w3-red w3-hover-black">
              x
            </button>
          </div>
          <center>
            <textarea
              style={{ width: "100%" ,marginTop:'21%'}}
              id="CommentInput"
              name="comment"
              placeholder="  Your comment........"
            ></textarea>
            {userData ? (
              <>
                {userData.user !== "no user" && currentVideo && currentVideo ? (
                  currentVideo.allowCommenting == true ? (
                    <button
                      onClick={redirectFunc}
                      style={{
                        height: "30px",
                        width: "fit-content",
                        position:'absolute',
                        right:'3%',
                        top:'5%',
                        border: "none",
                        marginTop: "2px",
                        paddingLeft: "2px",
                        position:'absolute',

                        paddingRight: "2px",
                      }}
                      className="w3-hover-black w3-blue w3-round w3-margin-top"
                    >
                      push comment
                    </button>
                  ) : (
                    <>
                     <button
                      style={{
                        height: "30px",
                        width: "fit-content",
                        position:'absolute',
                        right:'3%',
                        top:'5%',
                        border: "none",
                        marginTop: "2px",
                        paddingLeft: "2px",
                        position:'absolute',

                        paddingRight: "2px",
                      }}
                      className="w3-hover-black w3-blue w3-round w3-margin-top"
                    >
                      Login for commenting
                    </button>
                    </>
                  )
                ) : (
                  <button
                  style={{
                    height: "30px",
                    width: "fit-content",
                    position:'absolute',
                    right:'3%',
                    top:'5%',
                    border: "none",
                    marginTop: "2px",
                    paddingLeft: "2px",
                    position:'absolute',

                    paddingRight: "2px",
                  }}
                  className="w3-hover-black w3-blue w3-round w3-margin-top"
                >
                  Login for commenting
                </button>
                )}
              </>
            ) : (
              <button
                style={{
                  height: "30px",
                  width: "fit-content",
                  border: "none",
                  marginTop: "2px",
                  paddingLeft: "2px",
                  paddingRight: "2px",
                  color: "white",
                  backgroundColor: "lightgray",
                }}
                disabled
                className=" w3-round"
              >
                login
              </button>
            )}
            <div
              id="commentsList"
              style={{ height: "380px", marginTop: "-2.5%", overflowY: "scroll" }}
            >
              {CommentsOnThisPost ? (
                currentVideo && currentVideo ? (
                  currentVideo.allowCommenting == true ? (
                    CommentsOnThisPost.map((element, key) => (
                      <div
                        key={key}
                        className="w3-card-4"
                        style={{ width: "90%", marginTop: "20px" }}
                      >
                        <div style={{ fontSize: "10px" }} className="w3-container">
                          <br />
                          <img
                            src={element.ProfilePhotoUrl}
                            alt="Avatar"
                            className="w3-left w3-circle w3-margin-right"
                            style={{ width: "20%" }}
                          />
                          <h6>{element.userName}</h6>
                          <br />
                          <h5>
                            <b>{element.Comment}</b>
                          </h5>
                          <br />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w3-card-4" style={{ width: "90%" }}>
                      <div style={{ fontSize: "10px" }} className="w3-margin-top w3-container">
                        <center>
                          <h6>comments are turned off</h6>
                        </center>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w3-card-4 w3-margin-top" style={{ width: "20%" }}>
                    <img style={{ width: "100%" }} src={loading}></img>
                  </div>
                )
              ) : (
                <div className="w3-card-4 w3-margin-top" style={{ width: "20%" }}>
                  <img style={{ width: "100%" }} src={loading}></img>
                </div>
              )}
            </div>
          </center>
        </div></div>

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
              onClick={closeSupportModelPayment}
              className="w3-button w3-xlarge w3-hover-black w3-display-topright"
              title="Close SupportMadel"
            >
              X
            </span>
            <br />
            <br />
            <>
            </>
          </div>
        </div>
      </DashboardLayout>
      {WindowWidth < 900 ? "" :
      <Suspense
      fallback={<center><img src={loading} style={{width:'20%'}}></img></center>}
      >
      <Footer/>
      </Suspense>
      }
    </>
  )}else{
    return(
    <DashboardLayout>
       
      <center><img src={offline} style={{width:'50%'}}></img>
             <h1>You are offline</h1>
      </center>
  
    </DashboardLayout>)}
}


export default VideoPlayer;

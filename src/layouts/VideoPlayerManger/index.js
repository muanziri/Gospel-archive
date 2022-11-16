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
import Icon from "@mui/material/Icon";
import PlaceholderCard from "examples/Cards/PlaceholderCard"

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
//import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
//import Toolbar from "@mui/material/Toolbar"
import Footer from "examples/Footer";

//import {
//  navbar,
//  navbarContainer,
//  navbarRow,
//  navbarIconButton,
//  navbarMobileMenu,
//} from "examples/Navbars/DashboardNavbar/styles"
//import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
//import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import VideoPlayers from "examples/Cards/BlogCards/VideoPlayer"
import VideoJS from "examples/Cards/BlogCards/videoJs";
import {useNavigate} from 'react-router-dom'
import videojs from "video.js";
import useFetch from "react-fetch-hook"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faDownload, faShare, faEye } from "@fortawesome/free-solid-svg-icons";
import loading from "assets/images/Loading_2.gif";
import './index.css'
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

function VideoPlayerManger({ absolute, light, isMini }) {
  let BackendProxy='http://34.145.74.143:3001'//or http://localhost:3001
  const [actualComments, setActualComments] = useState([]);
   const CommentsDisplay = [];
   const CommentsOnThisPost=[]
   let contentPool = useFetch(BackendProxy+"/api/Content");
  let content = contentPool.data;
  const comment = useFetch(BackendProxy+"/api/commentPool");
  const comments = comment.data;
  let currentVideo;
 
  const [selectedImageChange, setSelectedImageChange] = useState();
  const imageChangeProfile=(e)=>{
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImageChange(e.target.files[0]);
      document.getElementById('upload').style.display='block'
    }
  }
  let { id } = useParams();
  const navigate = useNavigate();
  const hello= useFetch(BackendProxy+"/api");
  const userData=hello.data;
  let UserContent;
  let WindowWidth = window.innerWidth;
    if (comments && content ) {
      UserContent=content.filter(person => person.ThumbnailId == id)
      let commentsIds = UserContent[0].CommentsIds;
        if (commentsIds) {
          commentsIds.map((element) => {
              CommentsOnThisPost[CommentsOnThisPost.length] = comments.comments.filter(
                (person) => person._id == element
              )[0];
              
            }
          );
        }
       
      
    } 
 
  const CloseMessage = () => {
    document.getElementById('messagesPushed').style.display = 'none'
  }
  const changePrivacy=()=>{
    if(document.getElementById('PrivacyButton').innerText=='Turn to public'){
      document.getElementById('PrivacyButton').innerText='Turn to private'
      document.getElementById('PrivacyButton').className='w3-button w3-blue w3-round w3-margin-left w3-hover-green '
      let xhttp=new  XMLHttpRequest();
      var NewFormData=new FormData()
      xhttp.open("POST", BackendProxy+'/api/ChangePrivacy');
      NewFormData.append('thumbnailId',id)
      NewFormData.append('booleanGiven',false)
      xhttp.send(NewFormData);

    }else{document.getElementById('PrivacyButton').innerText='Turn to public';
    let xhttp=new  XMLHttpRequest();
    var NewFormData=new FormData()
    xhttp.open("POST", BackendProxy+'/api/ChangePrivacy');
    NewFormData.append('thumbnailId',id)
    NewFormData.append('booleanGiven',true)
    xhttp.send(NewFormData);
  }
  }
  const uploadNewThumbnail=()=>{
    let xhttp=new  XMLHttpRequest();
    var NewFormData=new FormData()
    xhttp.open("POST", BackendProxy+'/api/NewThumbnail');
    NewFormData.append('thumbnailIdData',document.getElementById('file').files[0])
    NewFormData.append('thumbnailId',UserContent[0].VideoId)
    NewFormData.append('folderId',userData.user.folderId)
    xhttp.send(NewFormData);
  }
  const changeCommency=()=>{
    if(document.getElementById('CommentBTN').innerText=='Turn off comments'){
      document.getElementById('CommentBTN').innerText='Turn on comments'
      document.getElementById('CommentBTN').className='w3-button w3-blue w3-round w3-margin-left w3-hover-green '
      let xhttp=new  XMLHttpRequest();
      var NewFormData=new FormData()
      xhttp.open("POST", BackendProxy+'/api/changeCommency');
      NewFormData.append('thumbnailId',id)
      NewFormData.append('booleanGiven',false)
      xhttp.send(NewFormData);

     }else{
      document.getElementById('CommentBTN').innerText='Turn off comments'
      let xhttp=new  XMLHttpRequest();
      var NewFormData=new FormData()
      xhttp.open("POST", BackendProxy+'/api/changeCommency');
      NewFormData.append('thumbnailId',id)
      NewFormData.append('booleanGiven',true)
      xhttp.send(NewFormData);
     }
   
   }
  
  const ManupulateDownloads=()=>{
    if(document.getElementById('DownloadManupBtn').innerText=='Hide download button'){
      document.getElementById('DownloadManupBtn').innerText='show download button'
      document.getElementById('DownloadManupBtn').className='w3-button w3-blue w3-round w3-margin-left w3-hover-green '
      let xhttp=new  XMLHttpRequest();
      var NewFormData=new FormData()
      xhttp.open("POST", BackendProxy+'/api/ManupulateDownloads');
      NewFormData.append('thumbnailId',id)
      NewFormData.append('booleanGiven',false)
      xhttp.send(NewFormData);

     }else{
      document.getElementById('DownloadManupBtn').innerText='Hide download button';
      let xhttp=new  XMLHttpRequest();
      var NewFormData=new FormData()
      xhttp.open("POST", BackendProxy+'/api/ManupulateDownloads');
      NewFormData.append('thumbnailId',id)
      NewFormData.append('booleanGiven',true)
      xhttp.send(NewFormData);

     }
   
  }
  const DeleteVideo=()=>{
    document.getElementById('deleteVideoButton').disabled=true
    let xhttp=new  XMLHttpRequest();
    var NewFormData=new FormData()
    xhttp.open("POST", BackendProxy+'/api/DeleteVideo');
    NewFormData.append('thumbnailId',id)
    NewFormData.append('videoId',UserContent[0].VideoId)
    
    xhttp.send(NewFormData);
    setTimeout(()=>{
      navigate('/profile')
    },5000)
  }
  let theUrl = "https://drive.google.com/uc?export=download&id=";

const DisplayContentEditor = () => {
  document.getElementById('ContentEditor').style.display = 'block'
}
const closeContentModal = () => {
  document.getElementById('ContentEditor').style.display = 'none'
}
  const playerRef = React.useRef(null);
  let source = theUrl + id;
  //let imgSrc=UserContent?UserContent.length>0?UserContent[0].VideoId::
  //const { size } = typography;
  //const { chart, items } = reportsBarChartData;
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: source,
        type: "video/mp4",
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  
    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });
  
    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )
  
  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);
  
  if (userData){
    if(userData.user!==undefined){
  return (
   <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid  style={{marginLeft:'3%',marginBottom:'3%',width:'50%'}}>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            {UserContent?<center><h3>{UserContent[0].Title}</h3></center>:<center><h3>Loading ...</h3></center>}
            </Grid>
          </Grid>
         {WindowWidth>500? <div  style={{height:'fit-content' ,width:'18%',position:'absolute',left:'5%',top:'15%'}}>
           
            { UserContent?UserContent.length>0?<img style={{display:'block',width:'93%'}} src={theUrl+UserContent[0].VideoId}></img>:<img style={{display:'block',width:'200px',height:'130px'}}></img>:<img style={{display:'block',width:'200px',height:'130px'}} ></img>}
            <button  className='w3-button w3-green w3-hover-light-green' onClick={DisplayContentEditor}>
             Change thumbnail
         </button>
         <div
            style={{
              zIndex: "0",
              width: "100%",
              height: "300px",
              position: "absolute",
              right: "-3%",
              top: "105%",
  
            }}
          >
            <center>
              <h4>
                <b>Comments</b>
              </h4>
            </center>
            
            <div
              style={{
                marginTop: "12px",
                overflowY: "scroll",
                position: "absolute",
                right: "0px",
                width: "100%",
                height: "220px",
              }}
            >
               {CommentsOnThisPost ? (
                              CommentsOnThisPost.map((element, key) => (
                                <div
                                  key={key}
                                  className="w3-card-4 w3-margin-left"
                                  style={{ width: "80%", marginTop: "20px" }}
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
                                <div style={{ fontSize: "10px" }} className="w3-container">
                                  <center>
                                    <img style={{ marginBottom: "45%" }} src={loading}></img>
                                  </center>
                                </div>
                              </div>
                            )}
            </div>
          </div>
         </div>:<div  style={{height:'fit-content' ,width:'100%',position:'absolute',left:'0%',top:'90%'}}>
           
           { UserContent?UserContent.length>0?<center><img style={{display:'block',width:'47%'}} src={theUrl+UserContent[0].VideoId}></img></center>:<center><img style={{display:'block',width:'200px',height:'130px'}}></img></center>:<img style={{display:'block',width:'200px',height:'130px'}} ></img>}
           <center><button  className='w3-button w3-green w3-hover-light-green' onClick={DisplayContentEditor}>
            Change thumbnail
        </button></center>
         <div
           style={{
             zIndex: "0",
             width: "100%",
             height: "500px",
             }}
         >
           <center>
             <h4>
               <b>Comments</b>
             </h4>
           </center>
           
           <div
             style={{
               marginTop: "12px",
               overflowY: "scroll",
               position: "absolute",
               right: "0px",
               width: "100%",
               height: "500px",
             }}
           >
              {CommentsOnThisPost ? (
                             CommentsOnThisPost.map((element, key) => (
                               <div
                                 key={key}
                                 className="w3-card-4 w3-margin-left"
                                 style={{ width: "80%", marginTop: "20px" }}
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
                               <div style={{ fontSize: "10px" }} className="w3-container">
                                 <center>
                                   <img style={{ marginBottom: "45%" }} src={loading}></img>
                                 </center>
                               </div>
                             </div>
                           )}
           </div>
         </div>
        </div>}
        { WindowWidth<500?
        <>
        <button id="deleteVideoButton" onClick={DeleteVideo} className="w3-button w3-red w3-round w3-margin-left"><i class="fa-solid fa-trash"></i></button>
         { UserContent?UserContent.length>0?UserContent[0].private == false?<button id='PrivacyButton' onClick={changePrivacy} className="w3-button w3-blue w3-round w3-margin-left"><i class="fa-solid fa-lock"></i></button>:<button id='PrivacyButton' onClick={changePrivacy} className="w3-button w3-blue w3-round w3-margin-left"><i class="fa-solid fa-unlock"></i></button>:<button id='PrivacyButton' onClick={changePrivacy} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>}
          
          {UserContent?UserContent.length>0?UserContent[0].showDownloadButton == true?<button id='DownloadManupBtn' onClick={ManupulateDownloads} className="w3-button w3-blue w3-round w3-margin-left"><i class="fa-solid fa-xmark"></i> <i class="fa-solid fa-download"></i></button>:<button id='DownloadManupBtn' onClick={ManupulateDownloads} className="w3-button w3-blue w3-round w3-margin-left"><i class="fa-solid fa-check"></i> <i class="fa-solid fa-download"></i></button>:<button id='DownloadManupBtn' onClick={ManupulateDownloads} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>}
          {UserContent?UserContent.length>0?UserContent[0].allowCommenting == true?<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left"><i class="fa-solid fa-xmark"></i> <i class="fa-solid fa-comment"></i></button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left"><i class="fa-solid fa-check"></i> <i class="fa-solid fa-comment"></i></button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>}
          </>:
          <>
          <button id="deleteVideoButton" onClick={DeleteVideo} className="w3-button w3-red w3-round w3-margin-left">Delete the Video</button>
           { UserContent?UserContent.length>0?UserContent[0].private == false?<button id='PrivacyButton' onClick={changePrivacy} className="w3-button w3-blue w3-round w3-margin-left">Turn to Private</button>:<button id='PrivacyButton' onClick={changePrivacy} className="w3-button w3-blue w3-round w3-margin-left">Turn to public</button>:<button id='PrivacyButton' onClick={changePrivacy} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>}
            
            {UserContent?UserContent.length>0?UserContent[0].showDownloadButton == true?<button id='DownloadManupBtn' onClick={ManupulateDownloads} className="w3-button w3-blue w3-round w3-margin-left">Hide download button</button>:<button id='DownloadManupBtn' onClick={ManupulateDownloads} className="w3-button w3-blue w3-round w3-margin-left">Allow download button</button>:<button id='DownloadManupBtn' onClick={ManupulateDownloads} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>}
            {UserContent?UserContent.length>0?UserContent[0].allowCommenting == true?<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Turn off comments</button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Turn on comments</button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>:<button id='CommentBTN' onClick={changeCommency} className="w3-button w3-blue w3-round w3-margin-left">Loading...</button>}
            </>
          }
        </SoftBox>
       
      </SoftBox>
      <div id='ContentEditor' className="w3-modal">
        <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ maxWidth: '600px' }}>
        <span onClick={closeContentModal} className="w3-button w3-xlarge w3-transparent w3-display-topright" >×</span>
           <div className="w3-section">
            <br/>
           <center><label><b>choose and upload your New thumbnail</b></label>
           {selectedImageChange &&  <div id='add'><img style={{display:'block',width:'200px',height:'130px'}} src={URL.createObjectURL(selectedImageChange)} /></div> }
           <br/>
           <br/>
          <input  id="file" onChange={imageChangeProfile} type="file"/>
          <button id='upload' onClick={uploadNewThumbnail} style={{display:'none'}} className="w3-button w3-hover-black w3-blue w3-round  w3-mobile w3-margin-bottom">Upload</button></center>
           </div>
        </div>
      </div>
      </DashboardLayout>
  

    
    
  );}else{
    return(
    <DashboardLayout>
      <DashboardNavbar />
   <div id='messagesPushed' className="w3-red w3-card w3-animate-bottom w3-padding w3-margin">
   <button  onClick={CloseMessage} className="w3-button w3-round-large w3-hover-red w3-display-topright">X</button>
     <center><p>Login to have Access</p></center>
     </div>
     </DashboardLayout>)}}
}

export default VideoPlayerManger;

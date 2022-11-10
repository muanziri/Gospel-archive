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
import axios from 'axios'
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import useFetch from "react-fetch-hook"
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard"
import ContentEditor from "examples/Cards/BlogCards/contentEditor"

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

import PlaceholderCard from "examples/Cards/PlaceholderCard";
import loading from "assets/images/Loading_2.gif";


// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import AccountStatus from "layouts/profile/components/AccountStatus";
import MonitizationSettings from "layouts/profile/components/MonitizationSetting";
function Overview() {
  let BackendProxy='http://localhost:3001'
  const [userData,setUserData]=useState()
  
  useEffect(()=>{
    axios.get(BackendProxy+'/api',{withCredentials:true})
    .then(function (response) {
      setUserData(response.data);
      
    })
    .catch(function (error) {
      console.error(error);
    });
    
  },[]);
let UserContent=[]
const InitContent = useFetch(BackendProxy+"/api/Content");
const content=InitContent.data
  const navigate = useNavigate();
  const FlashMessagesUser = useFetch(BackendProxy+"/api/FlashMessagesUser");
 
  let authChecker=FlashMessagesUser.data;
  const changeProfileInfo=(e)=>{
    e.preventDefault()
    var NewFormData=new FormData()
  var xhr = new XMLHttpRequest();
  
  NewFormData.append('ChangeProfile',document.getElementById('ChangeProfile').files[0])
  NewFormData.append('ChangeEmail',document.getElementById('ChangeEmail').value)
  NewFormData.append('ChangeName',document.getElementById('ChangeName').value)
  NewFormData.append('ChangePhone',document.getElementById('ChangePhone').value)
  NewFormData.append('userId',userData.user.folderId)
  xhr.open('POST',BackendProxy+'/api/ChangeProfileInfo');
  xhr.send(NewFormData);
  setTimeout(()=>{
    document.getElementById('ProfileEditor').style.display='none';
    document.getElementById('formProfileEditor').reset()
  },5000)
  }
  if(content){
    if(userData){
    UserContent.push(content.filter(person => person.userId == userData.user._id))}}
 
  

  
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setselectedVideo] = useState();
  const [selectedImageChange, setSelectedImageChange] = useState();
    const imageChangeProfile=(e)=>{
      if (e.target.files && e.target.files.length > 0) {
       
        setSelectedImageChange(e.target.files[0]);
        
      }
    }
    const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
        document.getElementById("nameOfSelectedImage").innerHTML=e.target.files[0].name;
        if(!document.getElementById('VideoInput').value && !document.getElementById('titleInput').value && !document.getElementById('CategoryInput').value){
        }else{
          document.getElementById('displayButton').style.display='block'
        }

      }
    };
    const videoChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setselectedVideo(e.target.files[0]);
        document.getElementById("nameOfSelectedVideo").innerHTML=e.target.files[0].name

      }
    };
 const redirectFunc =(e)=>{
  e.preventDefault()
  var NewFormData=new FormData()
  var xhr = new XMLHttpRequest();
  document.getElementById('displayButton').innerHTML = 'Uploaded'
    document.getElementById('displayButton').disabled = true
  NewFormData.append('VideoInput',document.getElementById('VideoInput').files[0])
  NewFormData.append('Title',document.getElementById('titleInput').value) 
  NewFormData.append('duration',document.getElementById('videoPreveiw').duration) 
  NewFormData.append('Category',document.getElementById('CategoryInput').value)
  NewFormData.append('Thumbnail',document.getElementById('Thumbnail').files[0])
  NewFormData.append('user',JSON.stringify(userData))
  xhr.open('POST', BackendProxy+'/api/ToTheDrive');
  xhr.send(NewFormData);
  setTimeout(()=>{
    navigate('/home')
  },5000)

}
  
  const closeModal = () => {
    document.getElementById('ProfileEditor').style.display = 'none'
  }
  const CloseMessage = async () => {
    document.getElementById('messagesPushed').style.display = 'none';
   
  }
  const closeContentModal = () => {
    document.getElementById('ContentEditor').style.display = 'none'
  }

  const Simbi = () => {
    document.getElementById('Simbi').style.display = 'block'
    document.getElementById('SimbiL').style.display = 'none'
    document.getElementById('SimbiLo').style.display = 'none'
  };
  const DisplayContentEditor = () => {
    document.getElementById('ContentEditor').style.display = 'block'
  }
  const SimbiL = () => {
    document.getElementById('Simbi').style.display = 'none'
    document.getElementById('SimbiLo').style.display = 'none'
    document.getElementById('SimbiL').style.display = 'block'
  }
  const SimbiLo = () => {
    document.getElementById('Simbi').style.display = 'none'
    document.getElementById('SimbiLo').style.display = 'block'
    document.getElementById('SimbiL').style.display = 'none'
  }
  const DisplayProfileEditor = () => {
    document.getElementById('ProfileEditor').style.display = 'block'
  }
  if(authChecker && userData){
    if(userData.user){
      let Name=userData.user.userName
  return (
    <DashboardLayout>
      { userData.user !== "no user"?
      <>
      <Header UserProfile={userData.user.ProfilePhotoUrl} UserName={userData.user.userName}  changeTab1={Simbi} changeTab2={SimbiL} changeTab3={SimbiLo} />
      <SoftBox mt={5} mb={3}>
        <Grid id="Simbi" style={{ display: 'none' }} container spacing={3}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-around' }}>
            <Grid style={{ marginLeft: '3%', marginBottom: '0.5%' }} item xs={12} md={6} xl={4}>
              <ProfileInfoCard
                profileEditToogle={DisplayProfileEditor}
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                fullName={userData.user.userName}
                email={userData.user.Email}
                PhoneNumber={userData.user.phoneNumber}
                ProfilePic={userData.user.ProfilePhotoUrl}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
              />
            </Grid>
            <Grid style={{ marginLeft: '3%', marginBottom: '0.5%' }} item xs={12} md={6} xl={4}>
              <AccountStatus views={userData.user.views} likes={userData.user.likes}/>
            </Grid>
            <Grid style={{ marginLeft: '3%', marginBottom: '0.5%' }} item xs={12} md={6} xl={4}>
              <MonitizationSettings showSupportButton1={userData.user.showSupportButton} userId={userData.user._id} showAccountPerfomance1={userData.user.showAccountPerfomance}/>
            </Grid>


          </div>
        </Grid>
      </SoftBox>
      <div id="ProfileEditor" className="w3-modal">
        <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ maxWidth: '600px' }}>
          <span onClick={closeModal} className="w3-button w3-xlarge w3-transparent w3-display-topright" >×</span>
          <form id='formProfileEditor'>
            <div className="w3-section">
              <br />
              <br />
              <br />
              <center>
                <label><b>Change your Profile info</b></label>
                {selectedImageChange &&  <div id='add'><img style={{display:'block',width:'200px',height:'130px'}} src={URL.createObjectURL(selectedImageChange)} /></div> }
                <input onChange={imageChangeProfile} id='ChangeProfile' className="w3-input w3-border w3-margin-bottom " style={{ width: '80%' }} type="file" />
                <label><b>Name</b></label>
                <input  id='ChangeName' className="w3-input w3-border w3-margin-bottom " style={{ width: '80%' }} type="text" />
                <label><b>Email</b></label>
                <input id='ChangeEmail'  className="w3-input w3-border w3-margin-bottom" style={{ width: '80%' }} type="email" />
                <label><b>Phone</b></label>
                <input id="ChangePhone" placeholder='(+ country code)------' className="w3-input w3-border w3-margin-bottom" style={{ width: '80%' }} type="text" />
                <button onClick={changeProfileInfo} id='ChangeButton' className="w3-blue w3-button ">Save changes</button>
              </center>
              <br />
            </div>
          </form>
        </div>
      </div>
      <SoftBox id="SimbiL" mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Your Content
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {content && userData?
             content.filter(person => person.userName == userData.user.userName).map(result=>
              <Grid item xs={12} md={6} xl={3}>
                <ContentEditor

                  image={"https://drive.google.com/uc?export=download&id="+result.VideoId}
                  category={{ color: "info", label: "short" }}
                  Kategory={result.Category}
                  title={result.Title}
                  authorImage={result.ProfilePhotoUrl}
                  authorName={result.userName}
                  authorDate= {result.Date}
                  Url={result.ThumbnailId}
                  duration={result.Duration}
                  author={{
                    image: "https://bit.ly/3kDZgRd",
                    name: "Mathew Glock",
                    date: "Posted on 28 February"
                  }}
                  action={{ type: "internal", route: "/VideoPlayerManger" }}

                />
              </Grid>
             ):
             <div><h1>Your Content is loading</h1></div>
             }
              <Grid onClick={DisplayContentEditor} style={{cursor:'pointer'}} item xs={12} md={6} xl={3}>
                <PlaceholderCard title={{ variant: "h5", text: "Upload Video" }} outlined />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>

      <div id="ContentEditor" className="w3-modal">
        <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ maxWidth: '600px' }}>
          <span onClick={closeContentModal} className="w3-button w3-xlarge w3-transparent w3-display-topright" >×</span>
          <form onSubmit={redirectFunc} id='formData'  method="post" encType="multipart/form-data">
            <div className="w3-section">
              <br />
              <br />
              <br />
              <center>
                <label><h3><b>Upload New  Content</b></h3></label>
                <br/>
                <label><b>New Video </b></label>
                {selectedVideo &&  <div id='addition'><video id='videoPreveiw' src={URL.createObjectURL(selectedVideo)} style={{display:'block',width:'300px',height:'150px'}} controls></video></div> }
                <center><h4 id='nameOfSelectedVideo'></h4></center>
                <input required accept='video/*' onChange={videoChange} id='VideoInput' name="Video" className="w3-input  w3-margin-bottom " style={{ width: '121px', border:'none' }} type="file" />
                <label><b>Title</b></label>
                <input required id='titleInput' name="Title" className="w3-input w3-border w3-margin-bottom " style={{ width: '80%' }} type="text" />
                <label><b>category</b></label>
                <br/>
                <select  required id='CategoryInput' name="Category" className="w3-select" style={{ width: '80%' }}>
                  <option value="" disabled selected>Choose Category</option>
                  <option value="Songs">Songs</option>
                  <option value="Preaching">Preaching</option>
                  <option value="Testmony">Testmony</option>
                </select>
                <br/>
                <label><b>Thumbnail</b></label>
                {selectedImage &&  <div id='add'><img style={{display:'block',width:'200px',height:'130px'}} src={URL.createObjectURL(selectedImage)} /></div> }
                <center><h4 id='nameOfSelectedImage'></h4></center>
                <input required accept='image/*'  onChange={imageChange}  name="Thumbnail" id='Thumbnail' className="w3-input  w3-margin-bottom" style={{ width: '121px', border:'none' }} type="file" />
                <br/>
                <p className='w3-p'>
                  <b>Notice:</b>
                  <br/>
                  The video will be fully available after 3 hours
                </p>
                <button id='displayButton'  style={{display:'none'}} className="w3-button w3-blue w3-round">Click to Upload</button>
              </center>
              <br />

            </div>
          </form>
        </div>
      </div>
      <SoftBox id="SimbiLo" style={{ display: 'none' }}>
        {/* <PlatformSettings Ammount={userData?userData.user.supportAmmount:'0'} /> */}
      </SoftBox>

      <div id='messagesPushed' style={{position:'fixed',width:'20%',height:'fit-content',right:'5%',bottom:'5%'}} className="w3-green w3-card w3-animate-left w3-padding w3-margin">
        <button onClick={CloseMessage} className="w3-button w3-round-large w3-hover-black w3-display-topright">X</button>
        <center><p>Welcome</p></center>
        </div>
      </>:<>
       <DashboardNavbar />
      <div id='messagesPushed' className="w3-red w3-card w3-animate-bottom w3-padding w3-margin">
      <button  onClick={CloseMessage} className="w3-button w3-round-large w3-hover-red w3-display-topright">X</button>
        <center><p>Login to access your Profile</p></center>
        </div></>}
      <Footer />
    </DashboardLayout>
  );}else{
    <DashboardLayout>
       <img style={{ width: "50%" }} src={loading}></img>
        <Footer />
      </DashboardLayout>
  }}else{
    return (
      <DashboardLayout>
        <img style={{ width: "50%" }} src={loading}></img>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default Overview;

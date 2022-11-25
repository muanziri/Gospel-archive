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

// react-router components
import { Link } from "react-router-dom";
import useFetch from "react-fetch-hook";


// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import loading from "assets/images/Loading_2.gif";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import './index.css'
function DefaultBlogCard({ categoryName,Duration,VideoId,image, category,followers,views,likes, title,authorImage,channelUrl, authorDate,authorName, action }) {
  const hello = useFetch("/api");
  let WindowWidth = window.innerWidth;
  const userData = hello.data;
  let theUrl="https://drive.google.com/uc?export=download&id="
  let defaultRoute="/VideoPlayer/"
  //  const CheckLoad=()=>{
  //  document.getElementById('loadingImage').style.display='none'
  //  document.getElementById('loadedImage').style.display='block'
    
  //  }
   const AddHistory=()=>{
    var NewFormData = new FormData();
    var xhr = new XMLHttpRequest();
    if(userData){
    if (userData.user) {
      if (userData.user !== "no user") {
        NewFormData.append("user", userData.user._id);
        NewFormData.append("videoId", VideoId);
        xhr.open("POST", "http://localhost:3001/api/addHistory");
        xhr.send(NewFormData);
      }
    }}else{console.log('hello')}

  }
    
  return (
    <Card >
      <SoftBox mt={2} mx={2}>
        <div className="container" >
       
        <img  className="image" id='loadedImage' src={theUrl+image}  alt={loading}  style={{width:'100%',height:'250px'}}></img>
        <div className="middle">
        <Link to={defaultRoute+VideoId}>
          
          <div onClick={AddHistory} className="container" ><FontAwesomeIcon  icon={faPlay} /></div></Link>
          </div>
         </div>
        <div style={{width:'20%',opacity:'1', borderRadius:'20px',backgroundColor:'#17C1E8',color:'white',textAlign:'center',fontSize:'15px',marginLeft:'80%',marginTop:'-7%',zIndex:'2'}}>{Duration}</div>
        
      </SoftBox>
      <SoftBox pb={3} px={3}>
        {category && (
          <SoftTypography
            variant="caption"
            color={category.color}
            textTransform="uppercase"
            fontWeight="medium"
            textGradient
          >
            {categoryName}
          </SoftTypography>
        )}
        <SoftBox display="block" mt={0.5} mb={1}>
          {action.type === "internal" ? (
            <Link to={defaultRoute+VideoId}>
              <SoftTypography
              onClick={AddHistory}
                display="inline"
                variant="h5"
                textTransform="capitalize"
                className="color-background"
              >
                {title}
              </SoftTypography>
            </Link>
          ) : (
            <MuiLink href={defaultRoute+VideoId} target="_blank" rel="noreferrer">
              <SoftTypography
                display="inline"
                variant="h5"
                textTransform="capitalize"
                className="color-background"
              >
                {title}
              </SoftTypography>
            </MuiLink>
          )}
        </SoftBox>
     
  
          <SoftBox display="flex" alignItems="center" mt={3}>
            <SoftAvatar variant="rounded" src={authorImage} alt={authorName} shadow="md" />
            <SoftBox pl={2} lineHeight={0}>
              <SoftTypography component="h6" variant="button" fontWeight="medium" gutterBottom>
                {authorName}
              </SoftTypography>
              <SoftTypography variant="caption" color="text">
                {authorDate}
              </SoftTypography>
            </SoftBox>
            <SoftTypography style={{position:'absolute',bottom:'15%',right:'15%'}} variant="caption" color="text">
               Views  <b>{views}</b>
               <br/>
               likes  <b>{likes}</b>
               <br/>
              </SoftTypography>
          </SoftBox>
          
   
      </SoftBox>
    </Card>
  );
}

// Setting default props for the DefaultBlogCard
DefaultBlogCard.defaultProps = {
  category: false,
  author: false,
};

// Typechecking props for the DefaultBlogCard
DefaultBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.oneOfType([
    PropTypes.shape({
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
      ]).isRequired,
      label: PropTypes.string.isRequired,
    }),
    PropTypes.bool,
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    }),
    PropTypes.bool,
  ]),
};

export default DefaultBlogCard;

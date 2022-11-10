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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import loading from "assets/images/Loading_2.gif";


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

function ContentEditor({ image, duration,category,Kategory, title, description,author, Url,authorImage,authorName,authorDate, action,openManager }) {
  return (
    <Card >
      <SoftBox mt={2} mx={2}>
        <img src={image}  style={{width:'100%',height:'100%'}} alt={loading}></img>
       
        <div style={{width:'20%',backgroundColor:'#17C1E8',borderRadius:'15%',color:'white',textAlign:'center',fontSize:'15px',marginLeft:'80%',zIndex:'2'}}>{duration}</div>
        <Link to={"/VideoPlayer/"+Url}><div style={{position:'absolute',top:'4%',left:'6%',color:'#17C1E8',cursor:'pointer'}}><FontAwesomeIcon icon={faPlay} /></div></Link>
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
            {Kategory}
          </SoftTypography>
        )}
        <SoftBox display="block" mt={0.5} mb={1}>
          {action.type === "internal" ? (
            <Link to={"/VideoPlayer/"+Url}>
              <SoftTypography
                display="inline"
                variant="h5"
                textTransform="capitalize"
                className="color-background"
              >
                {title}
              </SoftTypography>
            </Link>
          ) : (
            <MuiLink href={action.route} target="_blank" rel="noreferrer">
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
     
        {author && (
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
          </SoftBox>
        )}
      </SoftBox>
    </Card>
  );
}

// Setting default props for the DefaultBlogCard
ContentEditor.defaultProps = {
  category: false,
  author: false,
};

// Typechecking props for the DefaultBlogCard
ContentEditor.propTypes = {
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
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContentEditor;

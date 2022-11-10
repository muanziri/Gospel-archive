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

function Sermons() {
  let BackendProxy='http://localhost:3001'
  const { scrollY } = useScroll()
  const [content, setContent] = useState([])
   useEffect(() => {
    fetchData()
  }, [])
 
  async function fetchData() {
    let api = await fetch(BackendProxy+'/api/Content/Sermons')
    let apijson = await api.json()
    setContent(apijson)
  }
  

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
  const changeTheDateFormat = (n) => {

    let date = new Date(n);
    let newFormat = date.toUTCString();
    return newFormat;
  };

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
      <Footer />
    </DashboardLayout>
  );
}

export default Sermons;

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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
///import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
///import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";

// Soft UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import './index.css'

// Soft UI Dashboard React routes
import routes from "routes";


// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav } from "context";

// Images
import brand from "assets/images/logo67.webp";

export default function App() {
 
   const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  const sayHelloOnMouseEnter = () => {
    
    console.log('hello')
  };
  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };


  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "Home" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="Gospel Archived"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              
            />
            
           
          </>
        )}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Gospel Archived"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
         
         
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/Home" />} />
      </Routes>
    </ThemeProvider>
  );
}

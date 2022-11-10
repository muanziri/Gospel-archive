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
import React, { useState, useEffect } from 'react';

// react-router components


// prop-types is a library for typechecking of props

// @mui material components

// Soft UI Dashboard React components




function VideoPlayers({theSrc}) {
  
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 760px)").matches
  )
  const [matched, setMatched] = useState(
    window.matchMedia("(max-width: 1200px)").matches
  )

  
  useEffect(() => {
    window
    .matchMedia("(min-width: 760px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);
  useEffect(() => {
    window
    .matchMedia("(min-width: 1200px)")
    .addEventListener('change', e => setMatched( e.matches ));
  }, []);
  return (
    <>
    {matches &&
    (<>
      
      {!matched?
        <video style={{width:'170%',height:"70%",backgroundColor:'black'}} src={theSrc} autoPlay  controls></video>
        :<video style={{width:'80%',height:"150%",position:'absolute',left:'1%',backgroundColor:'black'}} autoPlay src={theSrc}  controls></video>
      }
      
     </>)}
    {!matches &&
    <>
     
       <video style={{width:'100%',height:"30%",position:'fixed',left:'0px',backgroundColor:'black'}} autoPlay src={theSrc}  controls></video>
      
     
    </>
    }
    </>
  );
}

// Setting default props for the DefaultBlogCard


export default VideoPlayers;

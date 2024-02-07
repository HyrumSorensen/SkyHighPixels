import React from 'react'
import logo1 from '../../images/logo1.png';
import appstorelogo from '../../images/appstorelogo.png';
import googleplay from '../../images/googleplay.png';
import '../../Theme/css/styles.css'
import "./landing.css";

function landing() {
  return (
    <div>
      <div className="header"></div>
      <div className="d-flex flex-column align-items-center main">
        <img alt="Quillish Logo" className="logo"src={logo1}/>
        <button className="createButton">Create account</button>
        <div className="d-flex flex-row justify-content-center iconsDiv">
          <div className="d-flex flex-column align-items-center">
            <img alt="App Store" className="appLogo mx-lg-4 mx-2"src={appstorelogo}/>
            <p>*Coming Soon</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <img alt="Google Play" className="appLogo mx-lg-4 mx-2"src={googleplay}/>
            <p>*Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default landing
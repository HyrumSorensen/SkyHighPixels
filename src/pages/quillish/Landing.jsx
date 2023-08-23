import React from 'react'
import logo1 from '../../images/logo1.png';
import appstorelogo from '../../images/appstorelogo.webp'
import googleplay from '../../images/googleplay.webp'
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
          <div>
            <img alt="App Store" className="appLogo mx-4"src={appstorelogo}/>
          </div>
          <div>
            <img alt="Google Play" className="appLogo mx-4"src={googleplay}/>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default landing
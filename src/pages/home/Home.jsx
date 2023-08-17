import React from 'react'
import '../../Theme/css/styles.css'
import Header from './Header'
import logo1 from '../../images/logo1.png';

function Home() {
  return (
    <div>
        <Header/>
        <img src={logo1}/>
    </div>
  )
}

export default Home
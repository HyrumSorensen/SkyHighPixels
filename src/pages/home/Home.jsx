import React from 'react'
import '../../Theme/css/styles.css'
import Header from './Header'
import logo from '../../images/logo-hedgehog-1.jpeg'

function Home() {
  return (
    <div>
        <Header/>
        <img src={logo}/>
    </div>
  )
}

export default Home
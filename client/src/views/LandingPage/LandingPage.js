import React, { Component } from 'react'
import './LandingPage.scss'
// import '../../Components/LandingPageComponents/bannerComponent/Banner'
import Banner from '../../Components/Landcompo/bannerComponents/landingpage.js'
import Motto from '../../Components/Landcompo/motto/motto'
import Footer from '../../Components/Footer/Footer.js';


export class LandingPage extends Component {
    render() {
        return (
            <div className="LandingPageStyle">
                <Banner />
                <div className='middleSection'>
                <Motto />
                 
                </div> 
                <Footer/> 
   
  
            </div>
        )
    }
}

export default LandingPage
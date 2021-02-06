import React, { Component } from 'react';
import './VaccineAppt.css';
import StepAppt from './StepAppt'
import SiteHeader from '../SiteHeader'
// import SignUp from './SignUp'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import Login from './Login';



class VaccineAppt extends Component {

    
    render() {
        return (
         <div>   
             <Login />
             <SiteHeader />
             <StepAppt />
        </div>
        )         
     }
}

 
export default VaccineAppt;
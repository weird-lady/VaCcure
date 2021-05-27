import React, { Component } from "react";
import { Link } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";
import store from "./../../store";

import "./Navbar.css";

class Navbar extends Component {

  logout() {
    store.dispatch(logoutUser());
  };
 

  render() {
    return (
      <div >
        <nav>      
            <ul id="test" class="navbar">
              <li id="test1"><Link to="/Dashboard"> <img id='logo' src= "Vaccure.png" alt="Vaccure" width = "130" height="64" ></img></Link></li>
              <li id='right2' onClick={this.logout} style={{display: "none"}}> <a><img src="Εxit.png" alt="Exit"></img></a></li>
              <li id='right1' style={{display: "none"}}><Link to="/Stats"> <img src="Statics.png" alt="Exit" width="25" height="23"></img></Link></li>
              <li id='right'style={{display: "none"}}><Link to="/newAppointment" > <img src="Calendar.png" alt="Calendar" width="30" height="30"></img></Link></li>
            </ul>
            
        </nav>
      </div>
    );
  }
}

export default Navbar;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from 'react-router-dom';
import "./style.css"
import { getAppointmentByamka } from "../../actions/appointmentActions"
// import Appointments from "./appointments/appointments"
// import SearchAppointments from "./appointments/searchAppointments"
const isEmpty = require("is-empty");

class Dashboard extends Component {

  constructor() {
    super();
    this.state = {

      resData: null,
      reqData: {
        firstName: "",
        lastName:  "",
        amka: "",
        searchDate: Date
      }
   };
 }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  editAppointment  (){ document.querySelector(".popup").style.display = "flex" };
  cancelAppointment(){ document.querySelector(".popup").style.display = "none" };

  searchByFullName(){
      document.querySelector(".searchByFullName").style.display = "flex"
      document.querySelector(".searchByAMKA").style.display = "none"
      document.querySelector(".searchByDate").style.display = "none"
      document.getElementById("searchButton").style.display = "flex"
  }

  searchByAMKA(){ 
      document.querySelector(".searchByAMKA").style.display = "flex"
      document.querySelector(".searchByFullName").style.display = "none"
      document.querySelector(".searchByDate").style.display = "none"
      document.getElementById("searchButton").style.display = "flex"
  }

  searchByDate(){
    document.querySelector(".searchByDate").style.display = "flex"
    document.querySelector(".searchByFullName").style.display = "none"
    document.querySelector(".searchByAMKA").style.display = "none"
    document.getElementById("searchButton").style.display = "flex"
  }

  search(){ 
    document.querySelector(".searchByFullName").style.display = "none"
    document.querySelector(".searchByAMKA").style.display = "none"
    document.querySelector(".searchByDate").style.display = "none"
    document.getElementById("searchButton").style.display = "none"
  }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };



  addRow(index, tableId){
    //for(var i=0; i<addRows; i++) {
      var newRow = document.getElementById(tableId).insertRow();
  
      var newCell = newRow.insertCell();
      newCell.innerHTML=" <tr ><td>index</td></tr>";
      let offset = () => { if(index<0) {return -index} return index+1}
      newCell.innerHTML= offset()

  
      newCell = newRow.insertCell();
      newCell.innerHTML='<tr><td  id = "fullName1"/></tr>';
      newCell.id="fullName"+index.toString()

      newCell = newRow.insertCell();
      newCell.innerHTML='<tr><td id = {"amkaNumber'+index.toString()+'"}/></tr>';
      newCell.id="amkaNumber"+index.toString()

      newCell = newRow.insertCell();
      newCell.innerHTML='<tr><td id = {"dateOfBirth'+index.toString()+'"}/></tr>';
      newCell.id="dateOfBirth"+index.toString()

      newCell = newRow.insertCell();
      newCell.innerHTML="<tr> <td>Pending</td> </tr>";
      
      newCell = newRow.insertCell();
      newCell.innerHTML='<tr><td><a href="#" class="edit" id ="editbutton" data-toggle="tooltip" onClick={this.editAppointment}><i class="material-icons">&#xE254;</i></a></td></tr>';

    //}
  }

  onSubmit = async e  => {

    e.preventDefault();
    document.getElementById("searchTable").style.display = "inline-table"
    document.getElementById("searchMessage").style.display = "flex"
    let resData = null;
    var reqData = [
                    {firstName: this.state.firstName },
                    {lastName:  this.state.lastName  },
                    {amka:      this.state.amka      },
                    {searchDate:this.state.searchDate}
                  ];

    if (!isEmpty(reqData[0].firstName) &&  !isEmpty(reqData[1].lastName))
    { 
      await getAppointmentByamka({firstName: reqData[0].firstName, lastName: reqData[1].lastName}).then(res =>resData=res);

      for(var j=-1; ; j--)
      {
        console.log(resData[0].firstName + " " + resData[0].lastName)
        console.log(resData[-j-1].firstName + " " + resData[-j-1].lastName)

        document.getElementById("fullName"+j.toString()).innerHTML = resData[-j-1].firstName + " " + resData[-j-1].lastName
        document.getElementById("amkaNumber"+j.toString()).innerHTML = resData[-j-1].amka
        let date = (new Date().getTime() - new Date(resData[-j-1].dateOfBirth).getTime())/(1000*60*60*24*365)
        date = Math.floor(date)
        document.getElementById("dateOfBirth"+j.toString()).innerHTML = date
        if (-j===resData.length) { break; }
        if (resData.length + 1 === document.getElementById("searchTable").rows.length) {break;}

        this.addRow(j-1, "searchTable") 
      }
      
    }
    else if(!isEmpty(reqData[2].amka))
    {
      
      await getAppointmentByamka(reqData[2]).then(res =>resData=res);
      let j = -1
      document.getElementById("fullName"+j.toString()).innerHTML = resData.firstName + " " + resData.lastName
      document.getElementById("amkaNumber"+j.toString()).innerHTML = resData.amka
      let date = (new Date().getTime() - new Date(resData.dateOfBirth).getTime())/(1000*60*60*24*365)
      date = Math.floor(date)
      document.getElementById("dateOfBirth"+j.toString()).innerHTML = date

    }
    else
    {
      await getAppointmentByamka(reqData[3]).then(res =>resData=res);
      
      for(var j=-1; ; j--)
      {
        console.log(resData[0].firstName + " " + resData[0].lastName)
        console.log(resData[-j-1].firstName + " " + resData[-j-1].lastName)

        document.getElementById("fullName"+j.toString()).innerHTML = resData[-j-1].firstName + " " + resData[-j-1].lastName
        document.getElementById("amkaNumber"+j.toString()).innerHTML = resData[-j-1].amka
        let date = (new Date().getTime() - new Date(resData[-j-1].dateOfBirth).getTime())/(1000*60*60*24*365)
        date = Math.floor(date)
        document.getElementById("dateOfBirth"+j.toString()).innerHTML = date
        if (-j===resData.length) { break; }
        if (resData.length + 1 === document.getElementById("searchTable").rows.length) {break;}

        this.addRow(j-1, "searchTable") 
      }

    }
    //return this.state.data
  };

    
  async getAppintmentsByDate () {

    let resData = null;
    var reqData = {searchDate: "2021-05-08"}
  
    await getAppointmentByamka(reqData).then(res =>resData=res);
    
    for(var j=0; j<resData.length; j++)
    {
        document.getElementById("fullName"+j.toString()).innerHTML = resData[j].firstName + " " + resData[j].lastName
        document.getElementById("amkaNumber"+j.toString()).innerHTML = resData[j].amka
        let date = (new Date().getTime() - new Date(resData[j].dateOfBirth).getTime())/(1000*60*60*24*365)
        date = Math.floor(date)
        document.getElementById("dateOfBirth"+j.toString()).innerHTML = date
        if (j===resData.length-1) { break; }
        if (resData.length +1 === document.getElementById("appointmentsTable").rows.length) {break;}
        this.addRow(j+1, "appointmentsTable") 
      
    }

    return resData;

  }

  show(){

    if(document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loaded);
    } else {
        loaded();
    }
    
    function loaded() {
      if(localStorage.jwtToken){
        document.getElementById("right").style.display = "flex"
        document.getElementById("right1").style.display = "flex"
        document.getElementById("right2").style.display = "flex"
      }
    };
  }
  render() {
    this.show()
    const { user } = this.props.auth;
    this.getAppintmentsByDate()

    return (
      
      <div  className="container valign-wrapper" style={{width:"100%", display: "flex"}}>
        <div className="row">
          <div class="left">
            <div className="col s12" style={{background:"#54B8C5",right:"0",left:"0",width: "1440px", height:"130px"}}>
              <div class="center">
                <br />
                <b style={{size: "30rem", width:"200rem"}}>Hospital Name:</b> {user.hospitalName.split()} <br/> 
                <b style={{size: "30rem", width:"200rem"}}>The hospital is placed at: </b>{user.address.split()}   
                                                                                        , {user.city.split()   }    
                                                                                        , {user.country.split()}
                                                                                      <br/>
                <b style={{size: "30rem", width:"200rem"}}>Phone:</b>{user.phone.split()}<br /> 
                <b style={{size: "30rem", width:"200rem"}}>email:</b>{user.email.split()}<br /> 
                <br />
              </div>
            </div>

            <div class="popup" id="editpopup">
              <div class="popup-content" id="editpopup1">

                <div class="modal-header">
                  <h4 class="modal-title">Edit Appointment</h4>
                </div>

                <div class="modal-body">
                  <br/>
                  <label><h6>First Name:</h6></label>
                  <input type="text" class="form-control" ></input>

                  <label><h6>Last Name:</h6></label>
                  <input type="text" class="form-control"></input>

                  <label><h6>AMKA:</h6></label>
                  <input type="text" class="form-control"></input>

                  <label><h6>Phone:</h6></label>
                  <input type="text" class="form-control"></input>

                  <label><h6>Address:</h6></label>
                  <input type="text" class="form-control"></input>

                  <h6>Gender:</h6> 
                  <label class="left"  >
                    <input type="checkbox" id="male" name="gender" value="male"/>
                    <span> <h7 class="center"className="black-text text-darken-1">Male</h7></span>
                  </label>

                  <label class="center" >
                    <input type="checkbox" id="female" name="gender" value="female" />
                    <span><h7  className="black-text text-darken-1">Female</h7></span>
                  </label>

                  <label class="right"   >
                    <input type="checkbox" id="other" name="gender" value="other"/>
                    <span><h7 class="center" className="black-text text-darken-1">Other</h7></span>
                  </label>

                  <br/><br/>
                  <label><h6>Birthday:</h6></label>
                  <input type="date" id="birthday" name="birthday"></input>

                </div>
                <div class="modal-footer" >
                  <br/>
                  <button type="button" class="btn btn-default" data-dismiss="modal">Submit</button>
                  <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.cancelAppointment}>Cancel</button>
                </div>                

              </div>
            </div>
      
            <div class="container">
              <div class="table-responsive">
                <div class="table-wrapper">
                  <div class="table-title">
                    <div class="row">
                      <hr></hr>
                      <p><br/><br/><br/><br/> 
    
                        <div class="left" style={{width:"200rem"}}>
                          <h6><b>Number of Vaccines for the day:</b> 1300</h6> 
                          <br />
                          <h6><b>Number of Vaccines for the week:</b> 150</h6>
                          <br />
                        </div>

                      </p>
          
                      <div class="col-sm-8">
                        <div class="center">
                          <br/><br/><br/><br/><br/>
                        </div>
                      </div>
                        
                      
                      <select id="mycombobox" style={{display: "flex"}}>
                        <option id = "Search"           onClick = {this.search} >Search</option>
                        <option id = "SearchByFullName" onClick = {this.searchByFullName}>Search By Full Name</option>
                        <option id = "SearchByAMKA"     onClick = {this.searchByAMKA}>Search By AMKA</option>
                        <option id = "SearchByDate"     onClick = {this.searchByDate}>Search By Date</option>
                      </select>

                      <form noValidate onSubmit={this.onSubmit}>

                        <div class="searchByFullName">
                          <input
                            onChange={this.onChange}
                            value={this.state.firstName}
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                          <input
                              onChange={this.onChange}
                              value={this.state.lastName}
                              id="lastName"
                              type="text"
                              placeholder="Last Name"
                          />
                        </div>

                          <input
                            class="searchByAMKA"
                            onChange={this.onChange}
                            value={this.state.amka}
                            id="amka"
                            type="text"
                            placeholder="AMKA"
                          />

                          <input class="searchByDate"
                            onChange={this.onChange}
                            value={this.state.searchDate}
                            id="searchDate"
                            type="date"
                          />
                        <button id = "searchButton" type="submit" style={{ display: "none" }}> Search </button>

                      </form>
                    </div>
                  </div>

                  <h5 id ="searchMessage" style={{display: "none"}}>Search Results</h5>
                  <div class="left">
                    <table id = "searchTable" class="table table-striped table-hover table-bordered" style={{background:"#ddf5be",width:"0",height:"8em", display: "none"}}>
                      
                      <thead>
                        <tr>
                          <th width="200rem"> No:</th>
                          <th width="500rem">Full Name</th>
                          <th width="500rem">AMKA</th>
                          <th width="500rem">Age</th>
                          <th width="500rem">Stage</th>
                          <th width="200rem">Action</th>
                        </tr>
                      </thead>
                      <tbody >
                        <tr >
                          <td>1</td>
                          <td id = {"fullName-1"}> </td>
                          <td id = {"amkaNumber-1"}></td>
                          <td id = {"dateOfBirth-1"}></td>
                          <td>Semicompleted</td>
                          <td>
                            <a href="#" class="edit" id ="editbutton" data-toggle="tooltip" onClick={this.editAppointment}><i class="material-icons">&#xE254;</i></a>
                          </td>
                        </tr>
                      </tbody>

                    </table>
                    <br /><br />
                  </div> 

                  <h5>Today's Appointments</h5>

                  <div class="left">
                    <table id = "appointmentsTable" class="table table-striped table-hover table-bordered" style={{background:"#D9F2F8",width:"0",height:"8em"}}>
                              
                      <thead>
                        <tr>
                          <th width="200rem"> No:</th>
                          <th width="500rem">Full Name</th>
                          <th width="500rem">AMKA</th>
                          <th width="500rem">Age</th>
                          <th width="500rem">Stage</th>
                          <th width="200rem">Action</th>
                        </tr>
                      </thead>
                      <tbody >
                        <tr >
                          <td>1</td>
                          <td id = {"fullName0"}> </td>
                          <td id = {"amkaNumber0" }></td>
                          <td id = {"dateOfBirth0" }></td>
                          <td>Semicompleted</td>
                          <td>
                            <a href="#" class="edit" id ="editbutton" data-toggle="tooltip" onClick={this.editAppointment}><i class="material-icons">&#xE254;</i></a>
                          </td>
                        </tr>
                      </tbody>

                    </table>
                  </div> 
               
                  <div class="clearfix">
                    <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                    <ul class="pagination">
                        <li class="page-item disabled"><a href="#"><i class="fa fa-angle-double-left"></i></a></li>
                        <li class="page-item"><a href="#" class="page-link">1</a></li>
                        <li class="page-item"><a href="#" class="page-link">2</a></li>
                        <li class="page-item active"><a href="#" class="page-link">3</a></li>
                        <li class="page-item"><a href="#" class="page-link">4</a></li>
                        <li class="page-item"><a href="#" class="page-link">5</a></li>
                        <li class="page-item"><a href="#" class="page-link"><i class="fa fa-angle-double-right"></i></a></li>
                    </ul>
                  </div> 
      
                </div>
              </div>
            </div>        
          </div>  
          <div className="col s6">
            <Link
              to="/newAppointment"
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginLeft: "10rem",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              New Appointment
            </Link>
          </div>

          <div class="center">
            <button
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                bottom: "0",
                left:"27rem",
                margin: "auto",
                display:"inline"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>

          <footer
            style={{position: "fixed",
                  left: "0",
                  width: "100%",
                  height: "56x",
                  padding: "0 25px",
                  display: "flex",
                  items: "right",
                  background: "#FFFFFF"
                  
            }}>
            
            <div>
              <div class="col-sm-12 footer__contact-us">
                 Contact us: 2310323988
              </div>
              <div class="col-sm-12">
                 Email: info@vaccure.com
              </div>
            </div>

            <div class="right" style={{padding:"0 100px"}}>
              <div class="col-sm-12 footer__links">
                <a href="terms">Terms of Use</a> | <a href="privacy">Privacy Policy</a>
              </div>
              <div class="col-sm-12 footer__copyright">(c) VAcCure. All rights reserved
              </div>
            </div>
          </footer>

        </div>   
      </div>

    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
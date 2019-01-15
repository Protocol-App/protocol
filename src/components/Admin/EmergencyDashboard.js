import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import AdminHeader from "./AdminHeader";
import openSocket from "socket.io-client";
import axios from "axios";
import Chat from './../Admin/AdminChat';

const socket = openSocket(process.env.REACT_APP_SOCKET);


class EmergencyDashboard extends Component {
  constructor() {
    super();

    this.state = {
      staff: [],
      protocolName: ""
    };

    socket.on("trigger-staff-api-call", async () => {
      if (this.props.admin.schoolID) {
        let res = await axios.get("/api/users");
        return this.setState({
          staff: res.data
        });
      }
    });
  }


  titleCase = str => {
    var splitStr = str.split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  async componentDidMount() {
    let res = await axios.get("/api/users");
    this.setState({
      staff: res.data,
      protocolName: this.titleCase(this.props.schoolEmergency.protocol_name.replace(/_/, " "))
    });
  }

  render() {
    let staff = this.state.staff.map((obj, index) => {
      return (
        <div className='user-styling' key={index}>
          <p>{obj.user_first_name + " " + obj.user_last_name}</p>
          <div>{" "}</div>
          <p>{obj.user_title}</p>
          {/* <p>{obj.school_id}</p> */}
          <p>{obj.emergency_status ? obj.emergency_status : "No Response"}</p>
          <p>{obj.emergency_steps_done ? "Protocols Complete" : "Protocols Incomplete"}</p>
        </div>
      )
    })
    return (
      <div className='emergency-dash-page' >
        <div className='emergency-header'>
         
        <h1>{this.state.protocolName} Emergency</h1>
        </div>
        <div className='emergency-page-container' >
          <div className='staff-styles'> 
          {staff}
          <button><Link to="/cancelemergency">Cancel Emergency</Link></button>
          </div>
          <div className='chat-styles'>
          <Chat />
          </div>
        </div>
       
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { admin, schoolEmergency } = state;
  return {
    admin,
    schoolEmergency
  };
}

export default connect(
  mapStateToProps,
  {}
)(EmergencyDashboard);

import React, { Component } from "react";
import { connect } from "react-redux";
import openSocket from "socket.io-client";
import axios from "axios";
import AdminChat from './../Admin/AdminChat';
import { withRouter } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert"; 
import {
  updateUser,
  updateAdmin,
  updateSchoolEmergency,
  updateActiveEmergency,
  updateEmergency
} from "../../dux/reducer";

const socket = openSocket(process.env.REACT_APP_SOCKET);

class EmergencyDashboard extends Component {
  constructor() {
    super();

    this.state = {
      staff: [],
      protocolName: "",
      showAlert: false
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

  async cancelEmergency() {
    try {
      await axios.post('/api/cancelemergency')
      socket.emit('cancelled-emergency')
      // this.props.updateActiveEmergency(false)
      // this.props.history.push('/dashboard')
    } catch {
      alert('Something went wrong. Please log in again')
      this.props.history.push('/')
    }
  }

  logout() {
    axios.post("/auth/logout");
    this.props.updateAdmin({});
    this.props.updateUser({});
    this.props.updateEmergency({});
    this.props.updateSchoolEmergency({});
    this.props.updateActiveEmergency(false);
    this.props.history.push("/");
  }

  render() {
    let staff = this.state.staff.map((obj, index) => {
      return (
        <div className='listOfUsers-emergency' key={index}>
          <div className="staff-number">{index + 1}</div>
          <p>{obj.user_first_name + " " + obj.user_last_name}</p>
          {/* <div>{" "}</div> */}
          <p>{obj.user_title}</p>
          {/* <p>{obj.school_id}</p> */}
          <p>{obj.emergency_steps_done ? "Protocols Complete" : "Protocols Incomplete"}</p>
          <p>{obj.emergency_status ? obj.emergency_status.replace(/^\w/, c => c.toUpperCase()) : "No Response"}</p>
          {obj.emergency_status === "safe" && <div className="safe-icon"></div>}
          {obj.emergency_status === "problem" && <div className="problem-icon"></div>}
          {obj.emergency_status === null && <div className="grey-icon"></div>}
        </div>
      )
    })
    return (
      <div className='emergency-dash-page' >
        <div className='emergency-header'>
          <button
            className="logout-button"
            onClick={() => this.logout()}>Logout</button>
          <h1
            className="emergency-title"
          >{this.state.protocolName} Emergency</h1>
          {/* <div className="problem-icon"></div> */}
        </div>
        <div className="emergency-page-container">
          <div className="staff-styles">
            <div>{staff}</div>
            <button className="cancel-emergency-button" onClick={this.showAlert}>Cancel Emergency</button>
          </div>
          {this.state.showAlert && <SweetAlert
            danger
            showCancel

            style={{fontFamily: "Prompt", fontSize: "18px"}}
            
            confirmBtnStyle={{border: "none", fontSize: "16px", backgroundColor: "#EE0000", color: "white", fontFamily: "Prompt", width: "175px", height: "50px", borderRadius: "5px"}}
            cancelBtnStyle={{backgroundColor: "white", fontSize: "16px", color: "black", fontFamily: "Prompt", width: "175px", border: "1px solid black", height: "50px", borderRadius: "5px"}}
            confirmBtnText="Confirm Cancel"
            cancelBtnText="Go Back"

            title="Are you sure?"
            onConfirm={() => this.cancelEmergency()}
            onCancel={this.hideAlert}
          >
            <br />
            Your staff will be notified immediately.
          </SweetAlert>}
          <div className="chat-styles">
            <AdminChat />
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

export default withRouter(
  connect(
    mapStateToProps, {
      updateUser,
      updateAdmin,
      updateSchoolEmergency,
      updateActiveEmergency,
      updateEmergency
    }
  )(EmergencyDashboard)
);

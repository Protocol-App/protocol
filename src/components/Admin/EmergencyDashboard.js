import React, { Component } from "react";
import { connect } from "react-redux";
import openSocket from "socket.io-client";
import axios from "axios";
import AdminChat from "./../Admin/AdminChat";
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
      protocolName: ""
    };

    socket.on("trigger-staff-api-call", async () => {
      if (this.props.admin.schoolID) {
        let res = await axios.get("/api/users");
        this.setState({
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
      protocolName: this.titleCase(
        this.props.schoolEmergency.protocol_name.replace(/_/, " ")
      )
    });
  }

  async cancelEmergency() {
    try {
      await axios.post("/api/cancelemergency");
      socket.emit("cancelled-emergency");
      // this.props.updateActiveEmergency(false)
      // this.props.history.push('/dashboard')
    } catch {
      alert("Something went wrong. Please log in again");
      this.props.history.push("/");
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

  showAlert = () => {
    this.setState({
      showAlert: true
    })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    })
  }

  render() {
    let staff = this.state.staff.map((obj, index) => {
      return (
        <div className="user-styling" key={index}>
          <p>{obj.user_first_name + " " + obj.user_last_name}</p>
          <div> </div>
          <p>{obj.user_title}</p>
          {/* <p>{obj.school_id}</p> */}
          <p>{obj.emergency_status ? obj.emergency_status : "No Response"}</p>
          <p>
            {obj.emergency_steps_done
              ? "Protocols Complete"
              : "Protocols Incomplete"}
          </p>
        </div>
      );
    });
    return (
      <div className="emergency-dash-page">
        <div className="emergency-header">
          <button className="logout-button" onClick={() => this.logout()}>
            Logout
          </button>
          <h1>{this.state.protocolName} Emergency</h1>
        </div>
        <div className="emergency-page-container">
        <div className="staff-styles">
          <div>{staff}</div>
          <button className="cancel-emergency-button" onClick={this.showAlert}>Cancel Emergency</button>
          </div>
          {this.state.showAlert && <SweetAlert
            danger
            showCancel
            style={{fontFamily: "Prompt", fontSize: "14px"}}
            confirmBtnText="Cancel the Emergency"
            cancelBtnText="Go Back"
            confirmBtnBsStyle="primary"
cancelBtnBsStyle="default"
            title="Are you sure?"
            onConfirm={() => this.cancelEmergency()}
            onCancel={this.hideAlert}
          >
            <br/>
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
    mapStateToProps,
    {
      updateUser,
      updateAdmin,
      updateSchoolEmergency,
      updateActiveEmergency,
      updateEmergency
    }
  )(EmergencyDashboard)
);

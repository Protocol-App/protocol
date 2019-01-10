import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AdminHeader from "./AdminHeader";
import openSocket from "socket.io-client";
import axios from "axios";
import Chat from './../Staff/Chat';
const socket = openSocket("http://206.189.65.223:4000/");

class EmergencyDashboard extends Component {
  constructor() {
    super();

    this.state = {
      staff: [],
      initiator: []
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

  async componentDidMount() {
    let res = await axios.get("/api/users");
    this.setState({
      staff: res.data
    });
  }

  render() {
    let staff = this.state.staff.map((obj, index) => {
      return (
        <div key={index}>
        <p>{obj.user_first_name + " " + obj.user_last_name}</p>
        <p>{obj.school_id}</p>
        <p>{obj.emergency_status ? obj.emergency_status : "No Response"}</p>
        <p>{obj.emergency_steps_done ? "Protocols Complete" : "Protocols Incomplete"}</p>
        </div>
      )
    })
    return (
      <div style={{display: 'flex', flexDirection: "column", alignItems: 'center'}}>
      <AdminHeader />
        Emergency Dashboard
        <div style={{display: 'flex', flexDirection: "row"}}>
        <div> {staff}</div>
        <div><Chat /></div>
        </div>
        <Link to="/cancelemergency">Cancel Emergency</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { admin } = state;
  return {
    admin
  };
}

export default connect(
  mapStateToProps,
  {}
)(EmergencyDashboard);

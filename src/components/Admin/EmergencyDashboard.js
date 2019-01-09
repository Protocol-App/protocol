import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AdminHeader from "./AdminHeader";
import openSocket from "socket.io-client";
import axios from "axios";
const socket = openSocket("http://localhost:4000/");

class EmergencyDashboard extends Component {
  constructor() {
    super();

    this.state = {
      staff: []
    };

    socket.on("trigger-staff-api-call", async () => {
      console.log("api call triggered");
      if (this.props.admin.schoolID) {
        let res = await axios.get("/api/updatedstaff");
        this.setState({
          staff: res.data
        });
      }
    });
  }

  async componentDidMount() {
    let res = await axios.get("/api/updatedstaff");
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
        <p>{obj.emergency_status}</p>
        <p>{obj.emergency_steps_done ? "emergency steps done" : "emergency steps not done"}</p>
        </div>
      )
    })
    return (
      <div>
        <AdminHeader />
        Emergency Dashboard
        {staff}
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

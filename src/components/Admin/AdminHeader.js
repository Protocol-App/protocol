import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/protocol-logo.svg";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateUser,
  updateAdmin,
  updateSchoolEmergency,
  updateActiveEmergency,
  updateEmergency
} from "../../dux/reducer";




class AdminHeader extends Component {


  render() {
    return (
      <div className="dashboard-view">
        <div className="dashboard-sidebar">
          <img className="sidebar-logo" src={Logo} alt="Protocol Logo" />
          <div className="admin-routes-container">
            <div className="staff-icon" />
            <Link to="/dashboard/staff" className="admin-routes staff">
              Staff
            </Link>
            <div className="protocol-roll-icon" />
            <div
              to="/dashboard/activeshooterprotocol"
              className="admin-routes protocol"
            >
              Protocol
            </div>
            <div />
            <Link
              to="/dashboard/activeshooterprotocol"
              className="admin-routes-indent"
            >
              Active Shooter
            </Link>
            <div />
            <Link
              to="/dashboard/bombthreatprotocol"
              className="admin-routes-indent"
            >
              <div />
              Bomb Threat
            </Link>
            <div />
            <Link to="/dashboard/fireprotocol" className="admin-routes-indent">
              Fire
            </Link>
            <div />
            <Link to="/dashboard/otherprotocol" className="admin-routes-indent">
              Other
            </Link>
          </div>
        </div>
        <div className="header-title-container">
          <div className="dashboard-header">

            <h1 className="header-title">Staff Members</h1>
            </div>
            
          </div>
         
        </div>
      
    );
  }
}

// export default AdminHeader;

export default withRouter(
  connect(
    null,
    {
      updateUser,
      updateAdmin,
      updateSchoolEmergency,
      updateActiveEmergency,
      updateEmergency
    }
  )(AdminHeader)
);
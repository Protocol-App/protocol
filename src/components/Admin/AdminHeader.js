import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/protocol-logo.svg";

class AdminHeader extends Component {
  render() {
    return (
      <div className="dashboard-view">
        <div className="dashboard-sidebar">
          <div className="admin-routes-container">
            <img className="sidebar-logo" src={Logo} alt="Protocol Logo" />
            <Link to="/dashboard/staff" className="admin-routes">
              Staff
            </Link>
            <Link
              to="/dashboard/activeshooterprotocol"
              className="admin-routes"
            >
              Protocol
            </Link>
            <Link
              to="/dashboard/activeshooterprotocol"
              className="admin-routes indent"
            >
              Active Shooter
            </Link>
            <Link
              to="/dashboard/bombthreatprotocol"
              className="admin-routes indent"
            >
              Bomb Threat
            </Link>
            <Link to="/dashboard/fireprotocol" className="admin-routes indent">
              Fire
            </Link>
            <Link to="/dashboard/otherprotocol" className="admin-routes indent">
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

export default AdminHeader;

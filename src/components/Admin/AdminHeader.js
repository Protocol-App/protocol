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
    console.log(this.props.history.location)

   var headerTitle =''
      if(this.props.history.location.pathname === '/dashboard/activeshooterprotocol'){
        headerTitle= 'Active Shooter Protocols'
      }else if(this.props.history.location=== '/dashboard/bombthreatprotocol'){
        headerTitle= 'Bomb Threat Protocols'
      }else if(this.props.history.location=== '/dashboard/fireprotocol'){
        headerTitle= 'Fire Protocols'
      }else if(this.props.history.location=== '/dashboard/otherprotocol'){
        headerTitle='Other Protocols'
      }else headerTitle= 'Staff Members'
      console.log('header title', headerTitle)
    
    return (
      <div className="dashboard-view">
        <div className="dashboard-sidebar">
          <img className="sidebar-logo" src={Logo} alt="Protocol Logo" />
          <div className="admin-routes-container">
            <div className="staff-icon" />
            <Link to="/dashboard/staff" className="admin-routes staff">
              Staff
            </Link>
            <div className={this.props.history.location.pathname === '/dashboard/staff'? "protocol-roll-icon" : "protocol-roll-icon-neon"} />
            <div
              to="/dashboard/activeshooterprotocol"
              className={this.props.history.location.pathname !== "/dashboard/staff" ? "admin-routes-neon":"admin-routes"}
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

            <button
              className="logout-button"
              onClick={() => this.logout()}>Logout</button>
            <h1 className="header-title">
            {headerTitle}
             </h1>
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
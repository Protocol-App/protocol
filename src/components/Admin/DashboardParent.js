import React, { Component } from "react";
import EmergencyDashboard from "./EmergencyDashboard";
import DefaultDashboard from "./DefaultDashboard";
import { connect } from "react-redux";
import { updateActiveEmergency } from "./../../dux/reducer";
import axios from "axios";
import AdminHeader from './AdminHeader';

class DashboardParent extends Component {
  
  async componentDidMount() {
    let res = await axios.get("/api/schoolemergency");
    console.log(res.data)
    if (res.data.activeEmergency) {
      this.props.updateActiveEmergency(true);
    } else {
      this.props.updateActiveEmergency(false)
    }

  }

  render() {
    let dashboardView = this.props.activeEmergency ? (
      <EmergencyDashboard />
    ) : (

      <DefaultDashboard />
    );
    return <div
    className='dashboard-container'
    >
      <AdminHeader />
      {dashboardView}
    </div>;
  }
}

function mapStateToProps(state) {
  const { activeEmergency } = state;
  return {
    activeEmergency
  };
}

export default connect(
  mapStateToProps,
  { updateActiveEmergency }
)(DashboardParent);

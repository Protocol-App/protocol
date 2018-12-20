import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader'

class EmergencyDashboard extends Component {
  render() {
    //only render when school.emergency_id is not null, could use && conditional render
    return (
      <div>
        <AdminHeader />
        Emergency Dashboard
        <Link to='/cancelemergency'>Cancel Emergency</Link>
      </div>
    );
  }
}

export default EmergencyDashboard;
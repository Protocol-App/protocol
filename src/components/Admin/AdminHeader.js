import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminHeader extends Component {
  render() {
    return (
      <div className='dashboard-view'>
        <div className='dashboard-sidebar'>
          <div>
            <Link to="/dashboard/staff">Staff</Link>
            <Link to="/dashboard/activeshooterprotocol">Active Shooter</Link>
            <Link to="/dashboard/bombthreatprotocol">Bomb Threat</Link>
            <Link to="/dashboard/fireprotocol">Fire</Link>
            <Link to="/dashboard/otherprotocol">Other</Link>
          </div>
        </div>
        <div className='header-title-container'>
          <div className='dashboard-header'>
            <h1 className='header-title'>Staff Members</h1>
          </div>
        </div>

      </div>

    );
  }
}

export default AdminHeader;
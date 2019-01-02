import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminHeader extends Component {
  render() {
    return (
      <div className='headerDiv'>
        <div className='admin-header'>
          <h1 className='headerTitle'>PROTOCOL</h1>
        </div>
        {/* <div className='admin-sidebar'>
          <div className='mainTabs'>
            <h2>Staff</h2>
            <h2>Protocol</h2>
          </div>
          <div className='subTabs'>
            <h3>Shooter</h3>
            <h3>Bomb</h3>
            <h3>Fire</h3>
            <h3>Other</h3>
          </div>
        </div> */}
        
        {/* Tim I see you're setting up the indented sidebar - below are the links for attach for that :)  */}
        <div>
          <Link to="/dashboard/staff">Staff</Link>
          <Link to="/dashboard/activeshooterprotocol">Active Shooter</Link>
          <Link to="/dashboard/bombthreatprotocol">Bomb Threat</Link>
          <Link to="/dashboard/fireprotocol">Fire</Link>
          <Link to="/dashboard/otherprotocol">Other</Link>
        </div> 
      </div>

    );
  }
}

export default AdminHeader;
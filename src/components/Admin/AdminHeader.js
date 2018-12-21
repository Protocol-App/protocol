import React, { Component } from 'react';

class AdminHeader extends Component {
  // constructor(){
  //   super();
  // }
  
  render() {
    return (
      <div>
        <div className='admin-header'>
          hello
        </div>
        <div className='admin-sidebar'>
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
        </div>
      </div>

    );
  }
}

export default AdminHeader;
import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Staff from './Staff';
import ActiveShooterProtocol from './ActiveShooterProtocol';
import BombThreatProtocol from './BombThreatProtocol';
import FireProtocol from './FireProtocol';
import OtherProtocol from './OtherProtocol';


class DefaultDashboard extends Component {
  render() {
    return (
      <div>
        Default Dashboard
        <Link to='/dashboard'>Staff</Link>
        <Link to='/dashboard/activeshooterprotocol'>Active Shooter</Link>
        <Link to='/dashboard/bombthreatprotocol'>Bomb Threat</Link>
        <Link to='/dashboard/fireprotocol'>Fire</Link>
        <Link to='/dashboard/otherprotocol'>Other</Link>
      <Switch>
          <Route exact path='/dashboard' component={Staff}/>
          <Route path='/dashboard/activeshooterprotocol' component={ActiveShooterProtocol}/>
          <Route path='/dashboard/bombthreatprotocol' component={BombThreatProtocol}/>
          <Route path='/dashboard/fireprotocol' component={FireProtocol}/>
          <Route path='/dashboard/otherprotocol' component={OtherProtocol}/>
      </Switch>
      </div>
    );
  }
}

export default DefaultDashboard;
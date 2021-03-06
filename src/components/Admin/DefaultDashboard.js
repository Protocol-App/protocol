import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Staff from "./Staff";
import ActiveShooterProtocol from "./ActiveShooterProtocol";
import BombThreatProtocol from "./BombThreatProtocol";
import FireProtocol from "./FireProtocol";
import OtherProtocol from "./OtherProtocol";
import AdminHeader from "./AdminHeader";
import {withRouter} from 'react-router-dom'

class DefaultDashboard extends Component {
  componentDidMount () {
    this.props.history.push('/dashboard/staff')
  }

  render() {
    return (
        <div>
         <AdminHeader />
          <Switch>
            <Route exact path="/dashboard/staff" component={Staff} />
            <Route exact path="/dashboard/activeshooterprotocol" component={ActiveShooterProtocol}/>
            <Route exact path="/dashboard/bombthreatprotocol" component={BombThreatProtocol} />
            <Route exact path="/dashboard/fireprotocol" component={FireProtocol} />
            <Route exact path="/dashboard/otherprotocol" component={OtherProtocol} />
          </Switch>
        </div> 
    )
  }
}

export default withRouter(DefaultDashboard);

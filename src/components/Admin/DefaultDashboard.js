import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Staff from "./Staff";
import ActiveShooterProtocol from "./ActiveShooterProtocol";
import BombThreatProtocol from "./BombThreatProtocol";
import FireProtocol from "./FireProtocol";
import OtherProtocol from "./OtherProtocol";
import AdminHeader from "./AdminHeader";

class DefaultDashboard extends Component {
  render() {
    return (
        <div>
         <AdminHeader />
          <Switch>
            <Route exact path="/dashboard" component={Staff} />
            <Route path="/dashboard/activeshooterprotocol" component={ActiveShooterProtocol}/>
            <Route path="/dashboard/bombthreatprotocol" component={BombThreatProtocol} />
            <Route path="/dashboard/fireprotocol" component={FireProtocol} />
            <Route path="/dashboard/otherprotocol" component={OtherProtocol} />
          </Switch>
        </div> 
    )
  }
}

export default DefaultDashboard;

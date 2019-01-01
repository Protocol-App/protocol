import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Staff from "./Staff";
import ActiveShooterProtocol from "./ActiveShooterProtocol";
import BombThreatProtocol from "./BombThreatProtocol";
import FireProtocol from "./FireProtocol";
import OtherProtocol from "./OtherProtocol";
import AdminHeader from "./AdminHeader";
import axios from "axios";

class DefaultDashboard extends Component {
  constructor() {
    super();
    this.state = {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Email: "",
      DefaultLocation: "",
      Title: ""
    };
    this.submitValidation = this.submitValidation.bind(this);
  }

  submitValidation() {
    const {
      FirstName,
      LastName,
      PhoneNumber,
      Email,
      DefaultLocation,
      Title
    } = this.state;
    if (
      FirstName &&
      LastName &&
      PhoneNumber &&
      Email &&
      DefaultLocation &&
      Title
    ) {
      this.handleSubmit();
    } else {
      alert("Please Complete entire form");
    }
  }

  handleSubmit() {
    const {
      FirstName,
      LastName,
      PhoneNumber,
      Email,
      DefaultLocation,
      Title
    } = this.state;
    axios
      .post("/create/user", {
        FirstName,
        LastName,
        PhoneNumber,
        Email,
        DefaultLocation,
        Title
      })
      .then(() => {
        console.log("User has been created");
        this.setState({
          FirstName: "",
          LastName: "",
          PhoneNumber: "",
          Email: "",
          DefaultLocation: "",
          Title: ""
        });
      });
  }
  render() {
    console.log(this.state);
    return (
      <div className="defaultDashboard">
        <div>
          <AdminHeader />
        </div>

        <div>
          Default Dashboard
          <Link to="/dashboard">Staff</Link>
          <Link to="/dashboard/activeshooterprotocol">Active Shooter</Link>
          <Link to="/dashboard/bombthreatprotocol">Bomb Threat</Link>
          <Link to="/dashboard/fireprotocol">Fire</Link>
          <Link to="/dashboard/otherprotocol">Other</Link>
          <Switch>
            <Route exact path="/dashboard" component={Staff} />
            <Route
              path="/dashboard/activeshooterprotocol"
              component={ActiveShooterProtocol}
            />
            <Route
              path="/dashboard/bombthreatprotocol"
              component={BombThreatProtocol}
            />
            <Route path="/dashboard/fireprotocol" component={FireProtocol} />
            <Route path="/dashboard/otherprotocol" component={OtherProtocol} />
          </Switch>
        </div>
        <div>
          <div>
            <div className="inputTitle">
              <div>First Name:</div>
              <div>Last Name:</div>
              <div>Phone Number:</div>
              <div>Email:</div>
              <div>Default Location:</div>
              <div>Title:</div>
            </div>
            <div>
              <input
                onChange={e => this.setState({ FirstName: e.target.value })}
                placeholder="First Name"
              />
              <input
                onChange={e => this.setState({ LastName: e.target.value })}
                placeholder="Last Name"
              />
              <input
                onChange={e => this.setState({ PhoneNumber: e.target.value })}
                placeholder="Phone #"
              />
              <input
                onChange={e => this.setState({ Email: e.target.value })}
                placeholder="Email"
              />
              <input
                onChange={e =>
                  this.setState({ DefaultLocation: e.target.value })
                }
                placeholder="Room Number"
              />
              <input
                onChange={e => this.setState({ Title: e.target.value })}
                placeholder="Title"
              />
            </div>
            <button onClick={this.submitValidation}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultDashboard;

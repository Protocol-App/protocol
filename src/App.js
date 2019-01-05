import React, { Component } from "react";
import "./App.css";
import routes from "./routes/routes";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import {
  updateUser,
  updateAdmin,
  updateAllEmergencies,
  updateActiveEmergency,
  updateEmergency,
  pushNewEmergency
} from "./dux/reducer";
import { withRouter } from "react-router-dom";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4000/");

class App extends Component {
  constructor() {
    super();
    //renders all current emergengies to redux once user opens browser
    socket.on("emergencies", allEmergencies => {
      console.log("SOCKETS: all emergencies sent after connect or cancel: ", allEmergencies);
      this.props.updateAllEmergencies(allEmergencies)
    });

    socket.on("emergency", emergency => {
      console.log("emergency invoked and sent out: ", emergency);
      this.props.pushNewEmergency(emergency.schoolWithEmergency);
    });
  }

  async componentDidMount() {
    let res = await axios.get("/auth/sessiondata");
    console.log("initial cdm", res.data);
    if (res.data.user) {
      this.props.updateUser(res.data.user);
    } else if (res.data.admin) {
      this.props.updateAdmin(res.data.admin);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allEmergencies !== this.props.allEmergencies) {
      console.log("props no longer match");
      console.log('current emergencies from app.js cdu:', this.props.allEmergencies)    
      if (Array.isArray(this.props.allEmergencies) && this.props.allEmergencies.length) {
        this.props.allEmergencies.flat().forEach(emergency => {
          console.log('emergency array isnt empty, foreach loop running')
          if (emergency.school_id === (this.props.admin.schoolID || this.props.user.schoolID)) {
            console.log("emergency school id matched with admin/user!");
            console.log(emergency.school_id);
            console.log(this.props.admin.schoolID || this.props.user.schoolID);
            this.props.updateActiveEmergency(true);
          } else {
            console.log('alerts in array but no emergency school ids match user/admin id, turning active emergency to false')
            this.props.updateActiveEmergency(false)
            this.props.updateEmergency({})
          }
        });
      } else if (Array.isArray(this.props.allEmergencies) && !this.props.allEmergencies.length){
        console.log('no emergency alerts in array, loop didnt run, turning active emergency to false')
        this.props.updateActiveEmergency(false)
        this.props.updateEmergency({})
      }
    }
  }
  //bugs - admin data is getting passed to redux state after cancel emergency, user state is wiped - is this a sessions thing with opening two browser pages on same computer?
  //fix bug in staff pin validation, somthign with component did mount
  //fix bug with clicking emit button from confirmemergency, pushes alert to db but page doesn't rerender, requires refresh to sync everything


  async logout() {
    await axios.post("/auth/logout");
    this.props.updateAdmin({});
    this.props.updateUser({});
    this.props.updateEmergency({})
    this.props.updateAllEmergencies([])
    this.props.updateActiveEmergency(false)
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="App">
        <Link to="/login">
          <button>Login page</button>
        </Link>
        <Link to="/protocol">
          <button>Protocol</button>
        </Link>
        <Link to="/dashboard">
          <button>dashboard</button>
        </Link>
        <Link to="/cancelemergency">
          <button>cancel Emergency</button>
        </Link>
      <button onClick={() => this.logout()}>Logout</button>
        {routes}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allEmergencies, user, admin } = state;
  return {
    allEmergencies,
    user,
    admin
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { updateUser, updateAdmin, updateAllEmergencies, updateActiveEmergency, pushNewEmergency, updateEmergency }
  )(App)
);

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
      this.props.updateAllEmergencies(allEmergencies)
    });
    //pushes new emergency to redux once socket pipe is triggered by another user (may or may not be from your org) submitting an emergency alert
    socket.on("emergency", emergency => {
      this.props.pushNewEmergency(emergency.schoolWithEmergency);
    });
  }

  async componentDidMount() {
    let res = await axios.get("/auth/sessiondata");
    if (res.data.user) {
      this.props.updateUser(res.data.user);
    } else if (res.data.admin) {
      this.props.updateAdmin(res.data.admin);
    }
  }
  

  componentDidUpdate(prevProps) {
    if (prevProps.allEmergencies !== this.props.allEmergencies) {
      if (Array.isArray(this.props.allEmergencies) && this.props.allEmergencies.length) {
        this.props.allEmergencies.flat().forEach(emergency => {
          if (emergency.school_id === (this.props.admin.schoolID || this.props.user.schoolID)) {
            this.props.updateActiveEmergency(true);
          } else {
            this.props.updateActiveEmergency(false)
            this.props.updateEmergency({})
          }
        });
      } else if (Array.isArray(this.props.allEmergencies) && !this.props.allEmergencies.length){
        this.props.updateActiveEmergency(false)
        this.props.updateEmergency({})
      }
    }
  }

//sessions bugs? - possibly fixed
//admin data was getting passed to redux state after cancel emergency, user state is wiped - is this a sessions thing with opening two browser pages on same computer?
//weird things going on with multiple browsers open...report emergency cdm takes forever to execute...only happens with multiple browsers that arent fresh. could it be a sessions thing?


  logout() {
    axios.post("/auth/logout");
    this.props.updateAdmin({});
    this.props.updateUser({});
    this.props.updateEmergency({})
    this.props.updateAllEmergencies([])
    this.props.updateActiveEmergency(false)
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="App">
        <Link to="/">
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

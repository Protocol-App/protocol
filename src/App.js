import React, { Component } from "react";
import "./App.css";
import routes from "./routes/routes";
import axios from "axios";
import { connect } from "react-redux";
import {
  updateUser,
  updateAdmin,
  updateSchoolEmergency,
  updateActiveEmergency,
  updateEmergency
} from "./dux/reducer";
import { withRouter } from "react-router-dom";
import openSocket from "socket.io-client";
const socket = openSocket(process.env.REACT_APP_SOCKET);


class App extends Component {
  constructor(props) {
    super(props);
    //renders all current emergengies to redux once user opens browser
    socket.on("get-emergencies", async () => {
      let res = await axios.get("/api/schoolemergency");
      if (res.data.activeEmergency) {
        this.props.updateSchoolEmergency(res.data.activeEmergency);
      } else {
        this.props.updateSchoolEmergency({})
      }
    });
  }

  async componentDidMount() {
    let res = await axios.get("/auth/sessiondata");
    if (res.data.user) {
      this.props.updateUser(res.data.user);
      if (this.props.location.pathname === '/') {
        this.props.history.push('/reportemergency')
      }
    } else if (res.data.admin) {
      this.props.updateAdmin(res.data.admin);
      if (this.props.location.pathname === '/') {
        this.props.history.push('/dashboard')
      }
    }
    }

  componentDidUpdate(prevProps) {
    if (prevProps.schoolEmergency !== this.props.schoolEmergency) {
      if (this.props.schoolEmergency.school_id) {
        this.props.updateActiveEmergency(true);
      } else {
        this.props.updateActiveEmergency(false);
        this.props.updateEmergency({});
      }
    }
  }

  logout() {
    axios.post("/auth/logout");
    this.props.updateAdmin({});
    this.props.updateUser({});
    this.props.updateEmergency({});
    this.props.updateSchoolEmergency({});
    this.props.updateActiveEmergency(false);
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
      <div className="App">
        {routes}
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { schoolEmergency, user, admin } = state;
  return {
    schoolEmergency,
    user,
    admin
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      updateUser,
      updateAdmin,
      updateSchoolEmergency,
      updateActiveEmergency,
      updateEmergency
    }
  )(App)
);

import React, { Component } from "react";
import "./App.css";
import routes from "./routes/routes";
import { Link } from "react-router-dom";
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
const socket = openSocket("http://localhost:4000/");

class App extends Component {
  constructor(props) {
    super(props);
    //renders all current emergengies to redux once user opens browser
    socket.on("get-emergencies", async () => {
      console.log("db getting an emergency");
      let res = await axios.get("/api/schoolemergency");
      console.log(res.data)
      if (res.data.activeEmergency) {
        this.props.updateSchoolEmergency(res.data.activeEmergency);
      }
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
        {/* <Link to="/">
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
<<<<<<< HEAD
        <button onClick={() => this.logout()}>Logout</button>
=======
      <button onClick={() => this.logout()}>Logout</button> */}
>>>>>>> 61f0e3f9e662414302529d46190fc4fc52ad5b93
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

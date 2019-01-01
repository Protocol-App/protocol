import React, { Component } from "react";
import "./App.css";
import routes from "./routes/routes";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect} from 'react-redux'
import {updateUser, updateAdmin} from './dux/reducer';
import {withRouter} from 'react-router-dom'

class App extends Component {
  async componentDidMount() {
    let res = await axios.get('/auth/sessiondata');
    console.log("initial cdm", res.data);
    if (res.data.user) {
    this.props.updateUser(res.data.user)
    } else if (res.data.admin) {
      this.props.updateAdmin(res.data.admin)
    }
  }

  async logout () {
    await axios.post('/auth/logout');
    this.props.updateAdmin({});
    this.props.updateUser({});
    this.props.history.push('/login')
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

export default withRouter(connect(null, {updateUser, updateAdmin})(App));

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader'
import axios from "axios"

class EmergencyDashboard extends Component {
  constructor(){
    super()
    this.state={
      users:[],
      initializedByUser:[]
    }
  }
  componentDidMount() {
    axios.get("/api/users").then(res => {
      this.setState({ users: res.data });
    }).catch(err => console.log("error: ", err))
    axios.get("/api/user").then(res=>{
      this.setState({initializedByUser: res.data})
    })
    
  }
  // activatedUserID(){
  //   axios.get("/api/user").then(res=>{
  //     this.setState({initializedByUserID: res.data});
  //   })
  // }
  render() {
    console.log(this.state.initializedByUser)
    //only render when school.emergency_id is not null, could use && conditional render
    return (
      <div>
        <AdminHeader />
        Emergency Dashboard

        <div>
          <div>
            {this.state.initializedByUser.map(user => {
              return(
                <div>
                  {user.user_first_name}
                  {user.user_last_name}
                </div>
              )
            })}
          </div>
        <div>
            {this.state.users.map(user => {
              return (
                <div className="listOfUsers" key={user.user_id}>
                  <div>{user.user_first_name}</div>
                  <div>{user.user_last_name}</div>
                  <div>{user.user_phone_number}</div>
                  <div>{user.default_location}</div>
                  <div>{user.user_title}</div>
                  <div>{user.emergency_steps_done ? "Protocols Complete" : "Protocols Incomplete"}</div>
                  <div>{user.emergency_status}</div>
                  
                  
                </div>
              );
            })}
          </div>
          <div>
            
          </div>
        </div>
        <Link to='/cancelemergency'>Cancel Emergency</Link>
      </div>
    );
  }
}

export default EmergencyDashboard;
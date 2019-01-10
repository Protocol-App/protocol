import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
const socket = openSocket('http://localhost:4000/');

class Chat extends Component {
    constructor (props) {
        super(props);

        this.state = {
            chat: [],
            message: ''
        }
        //receiving updated chat trigger from server socket
        socket.on(`get-updated-chat`, async () => {
            let res = await axios.get('/api/chat') 
            return this.setState({
                chat: res.data
            })
        })
    }

   async componentDidMount() {
        let res = await axios.get('/api/chat') 
        this.setState({
            chat: res.data
        })
    }
    
    handleInput (e) {
        this.setState({
            message: e
        })
    }
    
    assignAuthor () {
        if (this.props.user.userID) {
            return `${this.props.user.userFirstName} ${this.props.user.userLastName}`
        } else if (this.props.admin.adminID) {
            return `${this.props.admin.adminFirst} ${this.props.admin.adminLast}`
        }
    }
    
    async submitMessage(){
        let author = this.assignAuthor();
        await axios.post('/api/chat', {chatName: author, chatMessage: this.state.message, timestamp: moment().format('M/DD/YYYY h:mma')})
        //tell server something's updated in db
        socket.emit(`chat-update`)
        this.setState({
            message: ''
        })
    }

    render() {
      let emergencyChat = this.state.chat.map((message, index) => {
          return (
              <div style={{border: "2px solid black"}}key={index}>
              <p>Time: {moment(message.chat_timestamp).format("h:mma")}</p>
              <p>ID: {message.user_id}</p>
              <p>Name: {message.chat_name}</p>
              <p>Message: {message.chat_message}</p>
              </div>
          )
        })
        return (
      <div>
          {this.props.activeEmergency ?  
          <div>
          {this.props.user.userID && <Link to='/status'><button>Change Status</button></Link>}
          <h4>Chat</h4>
          {emergencyChat}
          <input value={this.state.message} onChange={(e) => this.handleInput(e.target.value)}></input>
          <button onClick={() => this.submitMessage()}>Send Message</button>
          <br></br>
          </div> 
          : this.props.history.push('/reportemergency')}
      
      </div>
    );
  }
}

function mapStateToProps (state) {
  let {admin, user, activeEmergency} = state
  return {
      admin,
      user,
    activeEmergency
  }
}

export default connect(mapStateToProps, {})(Chat);
import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
const socket = openSocket();

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: [],
            message: '',
            protocolName: '',

        }
        //receiving updated chat trigger from server socket
        socket.on(`get-updated-chat`, async () => {
            let res = await axios.get('/api/chat')
            return this.setState({
                chat: res.data
            })
        })
    }

    titleCase = str => {
        var splitStr = str.toUpperCase().split(" ");
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] =
                splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(" ");
    };

    async componentDidMount() {
        let res = await axios.get('/api/chat')
        this.setState({
            chat: res.data
        })
        let title = await axios.get("/api/emergencyprotocol");
        let activeProtocolName = this.titleCase(title.data.protocolName.replace(/_/, " "))
        this.setState({
            protocolName: activeProtocolName,
        });
    }

    handleInput(e) {
        this.setState({
            message: e
        })
    }

    // handleToggle(){
    //     if (this.state.toggle === true){
    //         return(
    //             <img/>
    //         )
    //     }else return(
    //         <img/>
    //     )
    // }

    assignAuthor() {
        if (this.props.user.userID) {
            return `${this.props.user.userFirstName} ${this.props.user.userLastName}`
        } else if (this.props.admin.adminID) {
            return `${this.props.admin.adminFirst} ${this.props.admin.adminLast}`
        }
    }

    async submitMessage() {
        let author = this.assignAuthor();
        if (this.state.message === '') {
            return (
                alert('Please type a message')
            )
        } else {
            await axios.post('/api/chat', { chatName: author, chatMessage: this.state.message, timestamp: moment().format('M/DD/YYYY h:mma') })
            //tell server something's updated in db
            socket.emit(`chat-update`)
            this.setState({
                message: ''
            })
        }
    }

    render() {
        console.log(this.props.user)
        !this.props.activeEmergency && this.props.history.push('/reportemergency')

        let emergencyChat = this.state.chat.map((message, index) => {
            console.log('message.user_id', message)
            console.log('this.props.admin', this.props.admin.adminID)
            return (
                <div>
                    <div className={message.user_id === this.props.admin.adminID ? 
                    'my-chat-name' : 'their-chat-name'} key={index}>
                    <p >
                    {message.user_id ===this.props.admin.adminID ? 'You' : message.chat_name}</p>
                    </div>
                    <div className={message.user_id === this.props.admin.adminID ? 'my-chat-feature' : 'their-chat-feature'} key={index}>
                        <p>Time: {moment(message.chat_timestamp).format("h:mma")}</p>
                        {/* <p>ID: {message.user_id}</p> */}

                        <p>Message: {message.chat_message}</p>
                    </div>
                </div>
            )
        })
        return (
            <div className='admin-chat-page'>
                <div className='dark-background'>

                    <div>
                        {/* <div className='top-space-div'></div> */}

                        {emergencyChat}
                        {/* <div className='bottom-space-div'></div> */}




                    </div>
                    <div className='send-message-container'>
                        <input placeholder='Message' value={this.state.message} onChange={(e) => this.handleInput(e.target.value)}></input>
                        <button className='send-button' onClick={() => this.submitMessage()}>Send </button>
                        <br></br>
                    </div>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { admin, user, activeEmergency } = state
    return {
        admin,
        user,
        activeEmergency
    }
}

export default connect(mapStateToProps, {})(Chat);
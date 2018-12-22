import React, { Component } from 'react';
import './App.css';
import routes from './routes/routes';
import {Link} from 'react-router-dom'

class App extends Component {

async componentDidMount () {
let res = await Axios.get('/api/sessiondata')
console.log('initial cdm', res)
}

  render() {
    return (
      <div className="App">
        <Link to='/login'><button>Login page</button></Link>
        <Link to='/protocol'><button>Protocol</button></Link>
        <Link to='/dashboard'><button>dashboard</button></Link>
        <Link to='/cancelemergency'><button>cancel Emergency</button></Link>
        
        
        {routes}
      </div>
    );
  }
}

export default App;

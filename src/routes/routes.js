import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginDashboard from '../components/Auth/LoginDashboard';
import AdminSignup from '../components/Auth/AdminSignup';
import StaffPinValidation from '../components/Auth/StaffPinValidation';
import ReportEmergency from '../components/Staff/ReportEmergency';
import ConfirmEmergency from '../components/Staff/ConfirmEmergency';
import Protocol from '../components/Staff/Protocol';
import Status from '../components/Staff/Status';
import DashboardParent from '../components/Admin/DashboardParent';
import CancelConfirmation from '../components/Admin/CancelConfirmation';


export default (
    <Switch>
        <Route path='/login' component={LoginDashboard}/>
        <Route path='/signup' component={AdminSignup}/>
        <Route path='/validate' component={StaffPinValidation}/>
        <Route path='/reportemergency' component={ReportEmergency}/>
        <Route path='/confirmemergency' component={ConfirmEmergency}/>
        <Route path='/protocol' component={Protocol}/>
        <Route path='/status' component={Status}/>
        <Route path='/dashboard' component={DashboardParent}/>
        <Route path='/cancelemergency' component={CancelConfirmation}/>
    </Switch>
)
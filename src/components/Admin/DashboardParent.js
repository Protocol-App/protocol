import React, { Component } from 'react';
import EmergencyDashboard from './EmergencyDashboard';
import DefaultDashboard from './DefaultDashboard';
import AdminHeader from './AdminHeader';

class DashboardParent extends Component {
    //component did mount to send school_id and access correct school object
    //if emergency_id is not null on school obj, send back school obj, users obj, emergency obj and protocol obj, set all to redux state
    //if emergency_id is null, just return school obj
    render() {
        // ternary to check if school.emergency_id in redux state is null or not
        //replace true/false with this.props.school.emergency_id
        let dashboardView = false ? <EmergencyDashboard /> : <DefaultDashboard />
        return (
            <div>
                <AdminHeader />
                {dashboardView}
            </div>
        )
    }
}

export default DashboardParent;
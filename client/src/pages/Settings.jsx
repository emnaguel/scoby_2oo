import React, { Component } from 'react'
import Profile from './Profile'
import { withUser } from "../components/Auth/withUser";
import "../styles/Profile.css";
export class Settings extends Component {
    render() {
       
        const { authContext } = this.props;
        const { user } = authContext;
        return (
            <div>
                <Profile/>
                {JSON.stringify(user, 2, null)}
                <h1>{user.firstName}</h1>
            </div>
        )
    }
}

export default withUser(Settings)

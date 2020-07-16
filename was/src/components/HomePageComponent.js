import React, { Component } from 'react'
import LogoutComponent from './LogoutComponent'
export default class HomePageComponent extends Component {
    render() {
        return (
            <div>
                ADMIN Home Page works!
                {/* <button onClick={() => {
                    localStorage.removeItem('token')
                    this.props.history.push("/")
                }}>Logout</button> */}
                <LogoutComponent />

            </div>
        )
    }
}


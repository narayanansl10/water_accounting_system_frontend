import React, { Component } from 'react'

export default class HomePageComponent extends Component {
    render() {
        return (
            <div>
                ADMIN Home Page works!
                <button onClick={() => {
                    localStorage.removeItem('token')
                    this.props.history.push("/")
                }}>Logout</button>

            </div>
        )
    }
}


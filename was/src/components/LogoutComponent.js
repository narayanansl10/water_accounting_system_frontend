import React, { Component } from 'react'

export default class LogoutComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <button onClick={() => {
                    localStorage.removeItem('token')
                    this.props.history.push("/")
                }}>Logout</button>
            </div>
        )
    }
}

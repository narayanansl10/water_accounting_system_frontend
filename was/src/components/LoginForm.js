import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import './styles/loginform.css'
const axios = require('axios')
const jwt = require('jwt-decode')

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.callLoginApi = this.callLoginApi.bind(this)
    }
    handleUsernameChange(event) {
        console.log(event.target.value)
        this.setState({ username: event.target.value })
    }
    handlePasswordChange(event) {
        console.log(event.target.value)
        this.setState({ password: event.target.value })
    }
    callLoginApi(event) {
        // console.log(this.state.username + " " + this.state.password)
        const url = "http://localhost:4000/auth/authenticate"
        const loginDetails = {
            phone_number: this.state.username,
            password: this.state.password
        }
        axios.post(url, loginDetails).then(res => {
            //console.log(res.data)
            if (res.data.success) {
                const token = res.data.token
                localStorage.setItem('token', token)
                const decoded = jwt(token)
                console.log(decoded)
                if (decoded.data.role === "admin") {
                    this.props.history.push("/home")
                }
                else {
                    this.props.history.push("/userhome")
                }
            }
        }).catch(err => {
            console.log(err)
        })

    }
    render() {
        return (
            <div className="loginform">
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" onChange={this.handleUsernameChange} />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={this.handlePasswordChange}
                />
                <Button id="B1" variant="contained" color="Primary" onClick={this.callLoginApi}>
                    LOGIN
                </Button>

            </div>
        )
    }
}

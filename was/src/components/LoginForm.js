import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import './styles/loginform.css'
import HeaderImage from '../assets/header-image.jpg'
import ImgMediaCard from './CardComponent'
import _url from './../URL'
const axios = require('axios')
const jwt = require('jwt-decode')


export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            announcementData: [],
            isDataAvailable: false,
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.callRegister = this.callRegister.bind(this)
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
    callRegister(event) {
        this.props.history.push('/register')
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
    componentDidMount() {
        this.getAnnouncements()
    }
    getAnnouncements() {
        const URL = _url + "/announcements/";
        axios.get(URL).then(res => {
            this.setState({ announcementData: res.data })
            this.setState({ isDataAvailable: true })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <div id="headerimage">
                    <div id="imagecontainer">
                        <img
                            src={HeaderImage}
                        />
                    </div>
                </div>
                <div className="body-container">
                    <div className="announcement-container">
                        <h2>Announcements</h2>
                        {
                            this.state.isDataAvailable ?
                                this.state.announcementData.map((element, index) => {
                                    return (
                                        <div>
                                            <div id="announcement">
                                                {element.name}
                                            </div>
                                            <br />
                                        </div>
                                    )
                                }) : ''
                        }
                    </div>
                    <div className="text-container"><p>DON'T LET LIFE SLIP DOWN THE RAIN!</p><ImgMediaCard /></div>
                    <div className="loginform">
                        <div>
                            <h2>Login Here</h2>
                        </div>
                        <div>
                            <TextField id="outlined-basic" label="Phone Number" variant="outlined" onChange={this.handleUsernameChange} />
                        </div>
                        <div>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                onChange={this.handlePasswordChange} />
                        </div>
                        <div>
                            <Button id="B1" variant="contained" color="Primary" onClick={this.callLoginApi}>
                                LOGIN
                            </Button>&nbsp;
                            <Button id="B1" variant="contained" color="Primary" onClick={this.callRegister}>
                                Register
                            </Button>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

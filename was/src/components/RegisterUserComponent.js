import React, { Component } from 'react'
import HeaderImage from '../assets/header-image.jpg'
import { TextField, Button } from '@material-ui/core'
import './styles/register.css'
import _url from './../URL'
const axios = require('axios')

export default class RegisterUserComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            aadharNumber: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            isValidName: true,
            isValidAadhar: true,
            isValidPassword: true,
            isValidPhoneNumber: true,
            isPasswordMatch: true
        }
    }

    isAlpha = (text) => {
        const regex = /^[A-Za-z ]*$/
        return regex.test(text)
    }
    isNum = (number) => {
        const regex = /^[0-9]*$/
        return regex.test(number)
    }

    handleSubmit = () => {
        this.setState({ isValidAadhar: false, isValidPassword: false, isValidPhoneNumber: false, isPasswordMatch: false })
    }
    resetForm = () => {
        this.setState({ isValidAadhar: true, isValidPassword: true, isValidPhoneNumber: true, isPasswordMatch: true, isValidName: true, username: '', aadharNumber: '', phoneNumber: '', password: '', confirmPassword: '' })
    }
    validateRegistration = () => {
        if (!this.checkPassword()) {
            this.setState({ isValidPassword: false })
        }
        if (!this.checkAadhar()) {
            this.setState({ isValidAadhar: false })
        }
        if (!this.isPasswordMatch()) {
            this.setState({ isPasswordMatch: false })
        }
        if (!this.checkPhoneNumber()) {
            this.setState({ isValidPhoneNumber: false })
        }
        if (!this.checkUsername()) {
            this.setState({ isValidName: false })
        }
        if (this.checkPassword() && this.checkAadhar() && this.isPasswordMatch() && this.checkPhoneNumber() && this.checkUsername()) {
            this.registerUser();
        }
    }
    registerUser = () => {
        const URL = _url + "/logindetails/create";
        axios.post(URL, {
            user_name: this.state.username,
            phonenumber: this.state.phoneNumber,
            password: this.state.password,
            aadhar_number: this.state.aadharNumber,
            role: 'user'
        }).then(res => {
            console.log(res)
            window.alert("Register Successful")
            this.props.history.push("/")
        }).catch(err => {
            console.log(err)
        })
    }

    checkPassword = () => {
        return (this.state.password.length > 7)
    }
    checkAadhar = () => {
        const regex = /^[0-9]{12}$/
        return regex.test(this.state.aadharNumber)
    }
    checkPhoneNumber = () => {
        const regex = /^[0-9]{10}$/
        return regex.test(this.state.phoneNumber)
    }
    isPasswordMatch = () => {
        return (this.state.password === this.state.confirmPassword && this.state.password !== '')
    }
    checkUsername = () => {
        return (this.state.username.length > 0)
    }

    handleOnChange = (event) => {
        if (event.target.name === "username") {
            if (this.isAlpha(event.target.value))
                this.setState({ username: event.target.value })
            console.log(this.state.username)
        } else if (event.target.name === "aadharnumber") {
            if (this.isNum(event.target.value))
                this.setState({ aadharNumber: event.target.value })
            console.log(this.state.aadharNumber)
        } else if (event.target.name === "phonenumber") {
            if (this.isNum(event.target.value))
                this.setState({ phoneNumber: event.target.value })
            console.log(this.state.phoneNumber)
        } else if (event.target.name === "password") {
            this.setState({ password: event.target.value })
            console.log(this.state.password)
        } else if (event.target.name === "cpassword") {
            this.setState({ confirmPassword: event.target.value })
            console.log(this.state.confirmPassword)
        }
    }
    render() {
        return (
            <div>
                <div >
                    <img id='headerimage'
                        src={HeaderImage}
                    />
                </div>
                <div className="body-container-register">

                    <div className="usernameField"><TextField error={!this.state.isValidName} name="username" id="outlined-basic" label="Name" variant="outlined" value={this.state.username} onChange={this.handleOnChange} helperText={!this.state.isValidName ? "Name cannot be empty" : ''} /></div>
                    <div className="aadharField"><TextField error={!this.state.isValidAadhar} name="aadharnumber" id="outlined-basic" label="Aadhar Number" variant="outlined" value={this.state.aadharNumber} onChange={this.handleOnChange} helperText={!this.state.isValidAadhar ? "Invalid Aadhar format" : ''} /></div>
                    <div className="phoneField"><TextField error={!this.state.isValidPhoneNumber} name="phonenumber" id="outlined-basic" label="Phone Number" variant="outlined" value={this.state.phoneNumber} onChange={this.handleOnChange} helperText={!this.state.isValidPhoneNumber ? "Invalid Phone Number" : ''} /></div>
                    <div className="passwordField"><TextField
                        error={!this.state.isValidPassword}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        variant="outlined"
                        helperText={!this.state.isValidPassword ? "Password must contain atleast 8 characters" : ''}
                        value={this.state.password}
                        onChange={this.handleOnChange}
                    /></div>
                    <div className="confirmField"><TextField
                        error={!this.state.isPasswordMatch}
                        id="outlined-password-input"
                        label="Confirm Password"
                        type="password"
                        name="cpassword"
                        autoComplete="current-password"
                        variant="outlined"
                        helperText={!this.state.isPasswordMatch ? "Confirm Password is not matched" : ''}
                        value={this.state.confirmPassword}
                        onChange={this.handleOnChange}
                    /></div>
                    <div>
                        <TextField variant="outlined" label="OTP" />
                    </div>
                    <div>
                        <Button id="B1" variant="contained" color="Primary" onClick={this.validateRegistration}>
                            Register
                </Button>
                        <Button id="B1" variant="contained" color="Primary" onClick={this.resetForm}>
                            Reset
                </Button>
                    </div>
                </div>
            </div>
        )
    }
}

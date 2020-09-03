import React, { Component } from 'react'
import HeaderImage from '../assets/header-image.jpg'
import { TextField, Button } from '@material-ui/core'
import './styles/register.css'
import './styles/talukcomponents.css'
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
            isPasswordMatch: true,
            isOTP: true,
            OTP: ''
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
        this.setState({ isValidAadhar: false, isValidPassword: false, isValidPhoneNumber: false, isPasswordMatch: false, isOTP: false })
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
        if (!this.checkOTP()) {
            this.setState({ isOTP: false })
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
    generateOTP = () => {
        const URL = _url + "/otp/create";
        axios.post(URL, {
            phone_number: this.state.phoneNumber,
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    checkOTP = () => {
        const URL = _url + "/otp/" + this.state.phoneNumber;
        axios.get(URL).then(res => {
            if (res.data.length > 0) { return true }
            console.log(res)
        }).catch(err => {
            console.log(err)
            return false
        })
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
        else if (event.target.name === "OTP") {
            this.setState({ OTP: event.target.value })
            console.log(this.state.OTP)
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

                    <div className="inputFieldContainer">
                        <TextField
                            error={!this.state.isValidName}
                            className="inputField"
                            name="username"
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={this.state.username}
                            onChange={this.handleOnChange}
                            helperText={!this.state.isValidName ? "Name cannot be empty" : 'Enter your name here'}
                        />
                    </div>
                    <div className="inputFieldContainer">
                        <TextField
                            error={!this.state.isValidAadhar}
                            className="inputField"
                            name="aadharnumber"
                            id="outlined-basic"
                            label="Aadhar Number"
                            variant="outlined"
                            value={this.state.aadharNumber}
                            onChange={this.handleOnChange}
                            helperText={!this.state.isValidAadhar ? "Invalid Aadhar format" : 'Enter your 12-digit aadhar number'}
                        />
                    </div>
                    <div className="inputFieldContainer">
                        <TextField
                            error={!this.state.isValidPhoneNumber}
                            className="inputField"
                            name="phonenumber"
                            id="outlined-basic"
                            label="Phone Number"
                            variant="outlined"
                            value={this.state.phoneNumber}
                            onChange={this.handleOnChange}
                            helperText={!this.state.isValidPhoneNumber ? "Invalid Phone Number" : 'Provide your 10-digit phone number'}
                        />
                    </div>
                    <div className="inputFieldContainer">
                        <TextField
                            error={!this.state.isValidPassword}
                            className="inputField"
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            variant="outlined"
                            helperText={!this.state.isValidPassword ? "Password must contain atleast 8 characters" : 'Create a new password'}
                            value={this.state.password}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="inputFieldContainer">
                        <TextField
                            error={!this.state.isPasswordMatch}
                            className="inputField"
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            name="cpassword"
                            autoComplete="current-password"
                            variant="outlined"
                            helperText={!this.state.isPasswordMatch ? "Confirm Password is not matched" : 'Renter the password'}
                            value={this.state.confirmPassword}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="inputFieldContainer">
                        <TextField
                            className="inputField"
                            className="inputField"
                            variant="outlined"
                            name="OTP"
                            label="OTP" onClick={this.handleOnChange}
                            helperText="Enter the OTP recived in your mobile"
                        />
                    </div>
                    <div className="inputFieldContainer">
                        <Button className="inputField" variant="contained" color="default" onClick={this.generateOTP}>
                            Generate OTP
                            </Button>
                    </div>
                    <div className="inputFieldContainer">
                        <Button className="submitField" id="B1" variant="contained" color="Primary" onClick={this.validateRegistration}>
                            Register
                </Button>
                        <Button className="submitField" id="B1" variant="contained" color="Primary" onClick={this.resetForm}>
                            Reset
                </Button>
                    </div>
                </div>
            </div>
        )
    }
}

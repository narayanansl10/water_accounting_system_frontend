import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _url from './../URL'
const axios = require('axios')
const jwt = require('jwt-decode')

export default class RegisterCropComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stateName: "",
            districtName: "",
            talukName: "",
            cropName: "",
            village: "",
            area: "",
            date: "",
            statearray: [],
            districtarray: [],
            talukarray: [],
            croparray: [],
            isDistrictAvailable: false,
            isTalukAvailable: false
        }
    }
    componentWillMount() {
        this.getStates()
        this.getCrops()
    }
    handleChangeState = (event) => {
        this.getDistrict(event.target.value)
        this.setState({ stateName: event.target.value, districtName: '', talukName: '' })
        this.setState({ isDistrictAvailable: true })
    }
    handleChangeDistrict = (event) => {
        this.getTaluk(event.target.value)
        this.setState({ districtName: event.target.value, talukName: '' })
        this.setState({ isTalukAvailable: true })
    }
    handleChangeTaluk = (event) => {
        this.setState({ talukName: event.target.value })
    }
    handleChangeVillage = (event) => {
        this.setState({ village: event.target.value })
    }
    handleChangeDate = (event) => {
        this.setState({ date: event.target.value })
    }
    handleChangeArea = (event) => {
        this.setState({ area: event.target.value })
    }
    handleChangeCrop = (event) => {
        this.setState({ cropName: event.target.value })
    }
    handleChangeSubmit = (event) => {
        this.callSubmit()
    }
    callSubmit() {
        const decoded = jwt(localStorage.token)
        console.log(decoded)
        const URL = _url + "/plantations/create";
        axios.post(URL, {
            crop_id: this.state.cropName,
            area_of_plantation: this.state.area,
            plantation_date: this.state.date,
            taluk_id: this.state.talukName,
            village_name: this.state.village,
            login_details: decoded.data._id
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    }
    getTaluk(districtId) {
        const URL = _url + "/taluks/TaluksForDistrict";
        axios.post(URL, { district_id: districtId }).then(res => {
            this.setState({ talukarray: res.data })
        }).catch(err => {
            console.log(err)
        })
    }

    getDistrict(stateId) {
        const URL = _url + "/districts/DistrictsForState";
        axios.post(URL, { state_id: stateId }).then(res => {
            this.setState({ districtarray: res.data })
        }).catch(err => {
            console.log(err)
        })
    }

    getStates() {
        const URL = _url + "/states";
        axios.get(URL).then(res => {
            this.setState({ statearray: res.data })
        }).catch(err => {
            console.log(err)
        })
    }

    getCrops() {
        const URL = _url + "/cropinfo";
        axios.post(URL).then(res => {
            this.setState({ croparray: res.data })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.stateName}
                        onChange={this.handleChangeState}
                        label="State"
                    > {
                            this.state.statearray.map((element, index) => {
                                return <MenuItem value={element._id}>{element.State_UT_Name}</MenuItem>
                            })

                        }
                    </Select>
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">District</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.districtName}
                        onChange={this.handleChangeDistrict}
                        label="District"
                    > {
                            this.state.districtarray.map((element, index) => {
                                return <MenuItem value={element._id}>{element.district_name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Taluk</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.talukName}
                        onChange={this.handleChangeTaluk}
                        label="Taluk"
                    > {
                            this.state.talukarray.map((element, index) => {
                                return <MenuItem value={element._id}>{element.taluk_name}</MenuItem>
                            })

                        }
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="Village" variant="outlined" onChange={this.handleChangeVillage} />
                <TextField
                    id="outlined-number"
                    label="Area Of Plantation"
                    type="number"
                    onChange={this.handleChangeArea}
                    variant="outlined"
                />
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Cropname</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.cropName}
                        onChange={this.handleChangeCrop}
                        label="Cropname"
                    > {
                            this.state.croparray.map((element, index) => {
                                return <MenuItem value={element._id}>{element.crop_name}</MenuItem>
                            })

                        }
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="Date of plantation" variant="outlined" type="date" onChange={this.handleChangeDate} />
                <Button variant="contained" color="primary" onClick={this.handleChangeSubmit}>
                    Submit
                </Button>


            </div>
        )
    }
}
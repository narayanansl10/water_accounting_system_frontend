import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import WaterAvailabilityComponent from './WaterAvailabilityComponent'
import Select from '@material-ui/core/Select';
import SideDrawer from './DrawerComponent'
import './styles/registercropcomponent.css'
import _url from './../URL'
import { Button } from '@material-ui/core';
import './styles/talukcomponents.css'
const axios = require('axios')
const jwt = require('jwt-decode')

export default class WaterBodyForTaluk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stateName: "",
            districtName: "",
            talukName: "",
            waterbodyName: "",
            statearray: [],
            districtarray: [],
            talukarray: [],
            waterbodyarray: [],
            isDistrictAvailable: false,
            isTalukAvailable: false,
            isDataAvailable: false,
            isWaterBodyAvailable: false,
            isReady: false
        }
        this.handleChangeShow = this.handleChangeShow.bind(this)
    }
    componentWillMount() {
        this.getStates()
    }
    handleChangeState = (event) => {
        this.getDistrict(event.target.value)
        this.setState({ stateName: event.target.value, districtName: '', talukName: '', waterbodyName: '' })
        this.setState({ isDistrictAvailable: true })
        this.setState({ isReady: false })
    }
    handleChangeDistrict = (event) => {
        this.getTaluk(event.target.value)
        this.setState({ districtName: event.target.value, talukName: '', waterbodyName: '' })
        this.setState({ isTalukAvailable: true })
        this.setState({ isReady: false })
    }
    handleChangeTaluk = (event) => {
        this.getWaterBody(event.target.value)
        this.setState({ talukName: event.target.value, waterbodyName: '' })
        this.setState({ isWaterBodyAvailable: true })
        this.setState({ isReady: false })

    }
    handleChangeWaterBody = (event) => {
        this.setState({ waterbodyName: event.target.value })
        this.setState({ isReady: false })
        console.log(event.target.value)
    }

    getTaluk(districtId) {
        const URL = _url + "/taluks/TaluksForDistrict";
        axios.post(URL, { district_id: districtId }).then(res => {
            this.setState({ talukarray: res.data })
        }).catch(err => {
            console.log(err)
        })
    }
    getWaterBody(talukId) {
        const URL = _url + "/waterinfo/waterbodyForTaluk";
        axios.post(URL, { taluk_id: talukId }).then(res => {
            this.setState({ waterbodyarray: res.data })
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
    handleChangeShow() {
        if (this.state.isReady) {
            this.setState({ isReady: false })
        }
        else { this.setState({ isReady: true }) }
    }

    render() {
        return (
            <div>
                <SideDrawer history={this.props.history}>
                </SideDrawer>
                <div>
                    <h1 id="headertextforcomponent">Graph For Talukwise Water Availability in Various Water Bodies</h1>
                </div>
                <div id="selectionuptotaluk">
                    {
                        <div id="selection1">
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
                            <FormControl variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">Water Body</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={this.state.waterbodyName}
                                    onChange={this.handleChangeWaterBody}
                                    label="WaterBody"
                                > {
                                        this.state.waterbodyarray.map((element, index) => {
                                            return <MenuItem value={element._id}>{element.tank_name}</MenuItem>
                                        })

                                    }
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={this.handleChangeShow}>
                                Show Graph
                        </Button>

                        </div>
                    }
                </div>
                <div id="rendercomponentwater">{this.state.isReady ? < WaterAvailabilityComponent waterbodyId={this.state.waterbodyName} /> : ''}</div>
            </div>

        )
    }
}
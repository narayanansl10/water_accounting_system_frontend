import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import MapWaterNeedView from './MapWaterNeedView'
import Select from '@material-ui/core/Select'
import GreenMarker from '../assets/GreenMarker.png'
import RedMarker from '../assets/RedMarker.png'
import './styles/registercropcomponent.css'
import './styles/talukcomponents.css'
import _url from './../URL'
import { Button } from '@material-ui/core';
import SideDrawer from './DrawerComponent'
import HeaderBarComponent from './HeaderBarComponent'
const axios = require('axios')
const jwt = require('jwt-decode')

export default class MapForTalukWaterNeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stateName: "",
            districtName: "",
            talukName: "",
            statearray: [],
            districtarray: [],
            talukarray: [],
            isDistrictAvailable: false,
            isTalukAvailable: false,
            isDataAvailable: false,
            isReady: false,
        }
        this.handleChangeShow = this.handleChangeShow.bind(this)
    }
    componentWillMount() {
        this.getStates()
    }
    handleChangeState = (event) => {
        this.getDistrict(event.target.value)
        this.setState({ stateName: event.target.value, districtName: '', talukName: '' })
        this.setState({ isDistrictAvailable: true })
        this.setState({ isReady: false })
    }
    handleChangeDistrict = (event) => {
        this.getTaluk(event.target.value)
        this.setState({ districtName: event.target.value, talukName: '' })
        this.setState({ isTalukAvailable: true })
        this.setState({ isReady: false })
    }
    handleChangeTaluk = (event) => {
        this.setState({ talukName: event.target.value })
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
                <div>
                    <h1 id="headertextforcomponent">Get Current Status Of Taluk</h1>
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
                            {console.log(this.state.talukName)}
                            <Button variant="contained" color="primary" onClick={this.handleChangeShow}>
                                Show Map
                        </Button>

                        </div>
                    }
                </div>
                <div style={{ textAlign: "center", fontSize: 20 + 'px', padding: 3 + '%' }}>
                    <b>Legend:</b><br />Water deficit area -
                    <img src={RedMarker} style={{ height: 1 + '%', width: 1.7 + '%', top: -1 + '%' }} /><br />
                    Water rich area -
                    <img src={GreenMarker} style={{ height: 2 + '%', width: 2 + '%' }} />
                </div>
                <div id="rendercomponent">
                    {this.state.isReady ? <MapWaterNeedView talukId={this.state.talukName} /> : ''}
                </div>
            </div>

        )
    }
}
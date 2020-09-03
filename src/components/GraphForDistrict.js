import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import GraphRainfallComponent from './GraphRainfallComponent'
import Select from '@material-ui/core/Select';
import './styles/registercropcomponent.css'
import _url from '../URL'
import { Button } from '@material-ui/core';
const axios = require('axios')
const jwt = require('jwt-decode')

export default class GraphForDistrict extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stateName: "",
            districtName: "",
            statearray: [],
            districtarray: [],
            isDistrictAvailable: false,
            isReady: false,
        }
        this.handleChangeShow = this.handleChangeShow.bind(this)
    }
    componentWillMount() {
        this.getStates()
    }
    handleChangeState = (event) => {
        this.getDistrict(event.target.value)
        this.setState({ stateName: event.target.value, districtName: '' })
        this.setState({ isDistrictAvailable: true })
        this.setState({ isReady: false })
    }
    handleChangeDistrict = (event) => {
        this.setState({ districtName: event.target.value })
        this.setState({ isReady: false })
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
                    {
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
                            <Button variant="contained" color="primary" onClick={this.handleChangeShow}>
                                Show Graph
                        </Button>
                            {this.state.isReady ? <GraphRainfallComponent mode={2} AreaId={this.state.districtName} /> : ''}
                        </div>
                    }
                </div>
            </div>

        )
    }
}
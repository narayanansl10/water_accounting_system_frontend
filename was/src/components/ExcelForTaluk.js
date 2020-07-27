import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './styles/registercropcomponent.css'
import FileSaver from 'file-saver';
import _url from '../URL'
import SideDrawer from './DrawerComponent'
import { Button } from '@material-ui/core';
const axios = require('axios')
const jwt = require('jwt-decode')


export default class GraphForTaluk extends Component {
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
        this.handleSubmit = this.handleSubmit.bind(this)
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
    handleSubmit() {
        const URL = _url + "/plantations/generateExcel/" + this.state.talukName
        fetch({
            method: 'GET',
        }).then(res => {
            const file = res.blob()
            return file
        }).then(blob => {
            const href = window.URL.createObjectURL(blob);
            const a = document.createElement('a')
            a.download = 'filename.xlsx';
            a.href = href;
            a.click();
            a.href = '';
        }).catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <SideDrawer history={this.props.history}>
                </SideDrawer>
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
                            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                Generate Excel
                        </Button>
                        </div>
                    }
                </div>
            </div>

        )
    }
}
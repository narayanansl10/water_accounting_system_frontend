import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import { TextField } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _url from './../URL'
const axios = require('axios')

export default class RegisterCropComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stateName: "",
            districtName: "",
            talukName: "",
            village: "",
            statearray: [],
            districtarray: [],
            talukarray: [],
            isDistrictAvailable: false,
            isTalukAvailable: false
        }
    }
    componentWillMount() {
        this.getStates()
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
            </div>
        )
    }
}
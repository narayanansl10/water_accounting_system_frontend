import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import { TextField } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
        this.handleChangeState = this.handleChangeState.bind(this)
        this.handleChangeDistrict = this.handleChangeDistrict.bind(this)
        this.handleChangeTaluk = this.handleChangeTaluk.bind(this)
        this.handleChangeVillage = this.handleChangeVillage.bind(this)
    }
    componentWillMount() {
        const url = "http://localhost:4000/states/"
        const input = {}
        axios.get(url, input).then(res => {
            this.setState({ statearray: res.data })
            console.log(this.state.statearray)
        }).catch(err => {
            console.log(err)
        })
    }
    handleChangeState(event) {
        this.setState({ stateName: event.target.value })
    }
    handleChangeDistrict(event) {
        this.setState({ districtName: event.target.value })
    }
    handleChangeTaluk(event) {
        this.setState({ talukName: event.target.value })
    }
    handleChangeVillage(event) {
        this.setState({ village: event.target.value })
    }
    GetDistrict = (event) => {
        const url = "http://localhost:4000/districts/DistrictsForState"
        console.log(this.state.stateName)
        axios.post(url, { state_id: event.target.value }).then(res => {
            this.setState({ districtarray: res.data })
            console.log(res.data)
            this.setState({ isDistrictAvailable: true })
            return res.data
        }).catch(err => {
            console.log(err)
        })
    };
    GetTaluk = (event) => {
        const url = "http://localhost:4000/taluks/TaluksForDistrict"
        console.log(this.state.districtName)
        axios.post(url, { district_id: event.target.value }).then(res => {
            this.setState({ talukarray: res.data })
            console.log(res.data)
            this.setState({ isTalukAvailable: true })
            return res.data
        }).catch(err => {
            console.log(err)
        })
    };
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
                {this.state.isDistrictAvailable ?
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">District</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.districtName}
                            //onOpen={this.GetDistrict}
                            onChange={this.handleChangeDistrict}
                            label="District"
                        > {
                                this.state.districtarray.map((element, index) => {
                                    return <MenuItem value={element._id}>{element.district_name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl> : ''
                }
                {this.state.isTalukAvailable ?
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Taluk</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.talukName}

                            //onOpen={this.GetTaluk}
                            onChange={this.handleChangeTaluk}
                            label="Taluk"
                        > {
                                this.state.talukarray.map((element, index) => {
                                    return <MenuItem value={element._id}>{element.taluk_name}</MenuItem>
                                })

                            }
                        </Select>
                    </FormControl> : ''
                }
                <TextField id="outlined-basic" label="Village" variant="outlined" onChange={this.handleChangeVillage} />
            </div>
        )
    }
}
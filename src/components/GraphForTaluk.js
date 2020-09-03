import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import GraphRainfallComponent from './GraphRainfallComponent'
import Select from '@material-ui/core/Select';
import './styles/registercropcomponent.css'
import './styles/talukcomponents.css'
import SideDrawer from './DrawerComponent'
import HeaderBarComponent from './HeaderBarComponent'
import _url from './../URL'
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
        this.getRainfall(event.target.value)
        this.setState({ districtName: event.target.value, talukName: '' })
        this.setState({ isTalukAvailable: true })
        this.setState({ isReady: false })
    }
    handleChangeTaluk = (event) => {
        this.setState({ talukName: event.target.value })
        this.setState({ isReady: false })
        console.log(event.target.value)
    }

    getRainfall(district_id) {
        const URL = _url + "/rainfall";
        axios.post(URL, { district_id: district_id }).then(res => {
            this.setState({ rainfallarray: res.data })
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
    handleChangeShow() {
        if (this.state.isReady) {
            this.setState({ isReady: false })
        }
        else { this.setState({ isReady: true }) }
    }

    render() {
        console.log(this.state.rainfallarray);
        return (
            <div>
                <HeaderBarComponent history={this.props.history}></HeaderBarComponent>
                {/* <SideDrawer history={this.props.history}>
                </SideDrawer> */}
                <div>
                    <h1 id="headertextforcomponent">Graph For Talukwise Water Need For Various Crops</h1>
                </div>
                <div id="selectionuptotaluk">
                    {
                        <div id="selection1" >
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
                                Show Graph
                        </Button>

                        </div>
                    }
                </div>
                <div id="rendercomponent">{this.state.isReady ? <GraphRainfallComponent mode={1} AreaId={this.state.talukName} /> : ''}</div>
                <div>
                    {this.state.rainfallarray ?
                        <div>
                            <div><b>Rainfall Data</b></div>
                            <div>ANNUAL: {this.state.rainfallarray[0].ANNUAL}mm</div>
                            <div>JAN {this.state.rainfallarray[0].JAN}mm</div>
                            <div>FEB {this.state.rainfallarray[0].FEB}mm</div>
                            <div>MAR {this.state.rainfallarray[0].MAR}mm</div>
                            <div>APR {this.state.rainfallarray[0].APR}mm</div>
                            <div>MAY {this.state.rainfallarray[0].MAY}mm</div>
                            <div>JUN {this.state.rainfallarray[0].JUN}mm</div>
                            <div>JUL {this.state.rainfallarray[0].JUL}mm</div>
                            <div>AUG {this.state.rainfallarray[0].AUG}mm</div>
                            <div>SEP {this.state.rainfallarray[0].SEP}mm</div>
                            <div>OCT {this.state.rainfallarray[0].OCT}mm</div>
                            <div>NOV {this.state.rainfallarray[0].NOV}mm</div>
                            <div>DEC {this.state.rainfallarray[0].DEC}mm</div>
                        </div>
                        : ''
                    }
                </div>
            </div >

        )
    }
}
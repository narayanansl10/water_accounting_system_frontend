import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './styles/registercropcomponent.css'
import './styles/talukcomponents.css'
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
            taluk_name: "",
            statearray: [],
            districtarray: [],
            talukarray: [],
            isDistrictAvailable: false,
            isTalukAvailable: false,
            isDataAvailable: false,
            isReady: false,
            exceldata: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAggSubmit = this.handleAggSubmit.bind(this)
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
        const URLf = _url + "/taluks/talukForId/" + this.state.talukName
        axios.get(URLf).then(response => {
            console.log(response.data[0].taluk_name)
            this.setState({ taluk_name: response.data[0].taluk_name })
        }).then(ress => {
            axios.get(URL).then(res => {
                this.setState({ exceldata: res.data })
                console.log(res.data)
            }).then(r => {
                var csvRow = [];
                var A = [['', 'Serial Number', 'Survey Number', 'Village Name', 'Area of Plantation', 'Crop Name', 'Plantation Data', 'Water Need in m^3', 'Water Need in m^3 in Account of Rainfall of this district', 'Discharge Need in m^3 / sec', 'Discharge Need in m^3 /sec in Account of Rainfall of this district']]
                var re = this.state.exceldata
                for (var i = 0; i < re.length; i++) {
                    A.push([re[i].serial_no, re[i].survey_number, re[i].village_name, re[i].area_of_plantation, re[i].crop_name, re[i].plantation_date, re[i].water_need, re[i].water_need_rainfall, re[i].discharge_water_need, re[i].discharge_water_need_rainfall])
                }
                for (var j = 0; j < A.length; ++j) {
                    csvRow.push(A[j].join(","))
                }
                var csvString = csvRow.join("%0A");
                var a = document.createElement("a");
                a.href = "data:attachment/csv" + csvString;
                a.target = "_Blank";
                a.download = this.state.taluk_name + "_crop_details.csv";
                document.body.appendChild(a);
                a.click();
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })

    }

    handleAggSubmit() {
        const URL = _url + "/plantations/talukwisecrops"
        const URLf = _url + "/taluks/talukForId/" + this.state.talukName
        const URLc = _url + "/cropinfo"
        axios.get(URLf).then(response => {
            this.setState({ taluk_name: response.data[0].taluk_name })
        }).then(ress => {
            axios.post(URL, { taluk_id: this.state.talukName }).then(res => {
                this.setState({ exceldata: res.data })
                //console.log(res.data)
            }).then(r => {
                axios.post(URLc, {}).then(rr => {
                    var csvRow = [];
                    var A = [['', 'Serial Number', 'Crop Name', ' Total Area of Plantation', 'Total Water Need in m^3', 'Total Water Need in m^3 in Account of Rainfall of this district', 'Total Discharge Need in m^3 / sec', 'Total Discharge Need in m^3 /sec in Account of Rainfall of this district']]
                    var re = this.state.exceldata
                    var cropname = 'Default'
                    console.log(rr)
                    for (var i = 0; i < re.length; i++) {
                        for (var j = 0; j < rr.data.length; j++) {
                            if (re[i]._id === rr.data[j]._id) {
                                cropname = rr.data[j].crop_name
                                break;
                            }
                        }
                        A.push([i + 1, cropname, re[i].sum_area, re[i].sum_of_water_need, re[i].sum_of_water_need_rainfall, re[i].sum_of_discharge_water_need, re[i].sum_of_discharge_water_need_rainfall])
                    }
                    for (var j = 0; j < A.length; ++j) {
                        csvRow.push(A[j].join(","))
                    }
                    var csvString = csvRow.join("%0A");
                    var a = document.createElement("a");
                    a.href = "data:attachment/csv" + csvString;
                    a.target = "_Blank";
                    a.download = this.state.taluk_name + "_crop_aggregated_details.csv";
                    document.body.appendChild(a);
                    a.click();
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })

    }

    render() {
        return (
            <div>
                <SideDrawer history={this.props.history}>
                </SideDrawer>
                <div>
                    <h1 id="headertextforcomponent">Generate Report for Talukwise Crops</h1>
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
                            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                Generate Excel with Complete Details
                        </Button>
                            <Button variant="contained" color="primary" onClick={this.handleAggSubmit}>
                                Generate Excel with Aggregated Details
                        </Button>
                        </div>
                    }
                </div>
            </div>

        )
    }
}
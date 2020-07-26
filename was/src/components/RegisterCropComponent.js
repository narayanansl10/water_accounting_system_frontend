import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import HeaderImage from '../assets/header-image.jpg'
import Select from '@material-ui/core/Select';
import './styles/registercropcomponent.css'
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
            surveynumber: "",
            statearray: [],
            districtarray: [],
            talukarray: [],
            croparray: [],
            isDistrictAvailable: false,
            isTalukAvailable: false,
            plantationData: [],
            isDataAvailable: false,
            isReady: false,
            isValidVillage: true,
            isValidArea: true,
            isValidSurvey: true
        }
    }
    componentWillMount() {
        this.getPlantationData()
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
    handleChangeSurvey = (event) => {
        this.setState({ surveynumber: event.target.value })
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
        this.setState({ isValidVillage: true, isValidArea: true })
        if (this.checkArea() && this.checkVillage() && this.checkSurvey()) {
            this.callSubmit()
        } else {
            if (this.checkArea()) {
                this.setState({ isValidArea: false })
            }
            if (this.checkVillage()) {
                this.setState({ isValidVillage: false })
            }
        }
    }
    handleChangeAdd = (event) => {
        this.setState({ isReady: true })
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
            survey_number: this.state.surveynumber,
            login_details: decoded.data._id
        }).then(res => {
            console.log(res);
            this.getPlantationData()
        }).catch(err => {
            console.log(err)
        })
    }

    getPlantationData() {
        const decoded = jwt(localStorage.token)
        const URL = _url + "/plantations/PlantationForLogin"
        axios.post(URL, { id: decoded.data._id }).then(res => {
            this.setState({
                plantationData: res.data, isDataAvailable: true, stateName: "", districtName: "", talukName: "", cropName: "", village: "", area: "", date: "", isReady: false
            })
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

    checkArea = () => {
        const regex = /^[0-9]*.?[0-9]*$/
        return regex.test(this.state.area)
    }

    checkVillage = () => {
        return (this.state.village.length > 0)
    }

    checkSurvey = () => {
        return (this.state.village.length > 0)
    }

    render() {
        return (
            <div>
                <div>
                    <img id='headerimage'
                        src={HeaderImage}
                    />
                    <div id='registertext'>
                        Register Your Crop
                    </div>
                </div>
                <div>
                    {
                        this.state.isDataAvailable ?
                            this.state.plantationData.map((element, index) => {
                                return (
                                    <div>
                                        <div>
                                            Crop: {element.crop_id}
                                            Area: {element.area_of_plantation}
                                            Date: {element.plantation_date}
                                            Village Name: {element.village_name}
                                        </div>
                                    </div>
                                )
                            }) : ''
                    }
                    {
                        this.state.isReady ?
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
                                <TextField id="outlined-basic" label="Survey Number" variant="outlined" onChange={this.handleChangeSurvey} />
                                <TextField
                                    id="outlined-number"
                                    label="Area Of Plantation in Hecatares"
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
                                <Button id="B1" variant="contained" color="primary" onClick={this.handleChangeSubmit}>
                                    Submit
                                </Button>
                            </div> :
                            <Button id="B1" variant="contained" color="primary" onClick={this.handleChangeAdd}>
                                Add Crop
                        </Button>
                    }
                </div>
            </div>

        )
    }
}
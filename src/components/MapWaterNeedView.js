import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./styles/MapCSS.css";
import _url from './../URL'
const axios = require('axios')

export default class MapTalukWise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            waterDataArray: [],
            waterAvailableData: [],
            waterNeedData: [],
            centerlat: '',
            centerlong: '',
            isReady: false,
            isRed: false
        }
    }
    componentWillMount() {
        this.getWaterBodies()
        this.getWaterAvailable()
        this.getTalukName()
    }
    setActiveWB() {
        if (!this.state.displayPopup) {
            this.setState({ displayPopup: true })
        }
        else {
            this.setState({ displayPopup: false })
        }
    }
    getWaterBodies() {
        const URL = _url + "/waterinfo/waterbodyForTaluk";
        axios.post(URL, { taluk_id: this.props.talukId }).then(res => {
            this.setState({ centerlat: res.data[0].latitude })
            this.setState({ centerlong: res.data[0].longitude })
        }).catch(err => {
            console.log(err)
        })
    }
    getTalukName() {
        const URL = _url + "/taluks/talukForId/" + this.props.talukId;
        axios.get(URL).then(res => {
            console.log(res.data)
            this.setState({ talukName: res.data.taluk_name })
            console.log(this.state.talukName)
        }).catch(err => {
            console.log(err)
        })
    }
    getWaterAvailable() {
        const URL = _url + "/plantations/talukwisewateravailable";
        axios.post(URL, { taluk_id: this.props.talukId }).then(res => {
            this.setState({ waterAvailableData: res.data })
            this.getWaterNeed()
        }).catch(err => {
            console.log(err)
        })
    }
    getWaterNeed() {
        const URL = _url + "/plantations/talukwisewaterneed";
        axios.post(URL, { taluk_id: this.props.talukId }).then(res => {
            console.log(res)
            this.setState({ waterNeedData: res.data })
            this.assignMarker()
        }).catch(err => {
            console.log(err)
        })
    }
    assignMarker() {
        if ((this.state.waterAvailableData.sum_of_available_capacity * 1000000 * 0.8) - this.state.waterNeedData.sum_of_water_need_rainfall > 0) {
            this.setState({ isRed: false, isReady: true });
        } else {
            this.setState({ isRed: true, isReady: true });
        }
    }
    render() {
        console.log(this.state.talukName)
        var Redimage = new L.Icon({
            iconUrl: require('../assets/RedMarker.png'),
            iconSize: [20, 30],
            iconAnchor: [10, 10]
        })
        var GreenImage = new L.Icon({
            iconUrl: require('../assets/GreenMarker.png'),
            iconSize: [20, 30],
            iconAnchor: [10, 10]
        })
        console.log(this.state.waterNeedData.sum_of_water_need, this.state.waterNeedData.sum_of_water_need_rainfall)
        return (
            <div>
                <Map center={[this.state.centerlat, this.state.centerlong]} zoom={13} >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.state.isReady ?
                        this.state.isRed ?
                            < Marker key={"A"} icon={Redimage} position={[this.state.centerlat, this.state.centerlong]}
                                onClick={() => {
                                    this.setActiveWB();
                                }}
                            /> :
                            < Marker key={"A"} icon={GreenImage} position={[this.state.centerlat, this.state.centerlong]}
                                onClick={() => {
                                    this.setActiveWB();
                                }}
                            />
                        : ''
                    }
                    {this.state.displayPopup ? <Popup
                        position={[
                            this.state.centerlat, this.state.centerlong
                        ]}
                        onClose={() => {
                            this.setActiveWB()
                        }}
                    >
                        <div>
                            <h3>{this.state.talukName}</h3>
                            <div>Water Available: {this.state.waterAvailableData.sum_of_available_capacity * 1000000} cu.m</div>
                            <div>Water Need: {this.state.waterNeedData.sum_of_water_need} cu.m</div>
                            <div>Water Need (inc Rainfall) {this.state.waterNeedData.sum_of_water_need_rainfall} cu.m</div>
                        </div>
                    </Popup> : ''}
                </Map >
            </div>
        )
    }

}
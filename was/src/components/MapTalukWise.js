import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "./styles/MapCSS.css";
import _url from './../URL'
const axios = require('axios')

export default class MapTalukWise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            waterDataArray: [],
            centerlat: '',
            centerlong: '',
            crop_id: '',
            crop_name: "",
            area: "",
            sum_water_need: '',
            sum_water_need_rainfall: '',
            sum_discharge_water_need_rainfall: '',
            sum_discharge_water_need: '',
        }
    }
    componentWillMount() {
        this.getWaterBodies()
        this.getTalukWiseDetails()
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
    getTalukWiseDetails() {
        const URL = _url + "/plantations/talukwisecrops";
        axios.post(URL, { taluk_id: this.props.talukId }).then(res => {
            console.log(res.data)
            this.setState({ talukDataArray: res.data })
            this.getDetails()
        }).catch(err => {
            console.log(err)
        })
    }
    getDetails() {
        for (var i = 0; i < this.state.talukDataArray.length; i++) {
            if (this.state.talukDataArray[i]._id === this.props.cropName) {
                this.setState({ crop_id: this.state.talukDataArray[i]._id })
                this.setState({ sum_of_water_need: this.state.talukDataArray[i].sum_of_water_need })
                this.setState({ area: this.state.talukDataArray[i].sum_area })
                this.setState({ sum_of_water_need_rainfall: this.state.talukDataArray[i].sum_of_water_need_rainfall })
                this.setState({ sum_of_discharge_water_need: this.state.talukDataArray[i].sum_of_discharge_water_need })
                this.setState({ sum_of_discharge_water_need_rainfall: this.state.talukDataArray[i].sum_of_discharge_water_need_rainfall })
            }
        }
        for (var i = 0; i < this.props.cropArray.length; i++) {
            if (this.state.crop_id === this.props.cropArray[i]._id) {
                this.setState({ crop_name: this.props.cropArray[i].crop_name })
            }
        }
    }
    render() {
        return (
            <div>
                <Map center={[this.state.centerlat, this.state.centerlong]} zoom={10} >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    < Marker key={"A"} position={[this.state.centerlat, this.state.centerlong]}
                        onClick={() => {
                            this.setActiveWB();
                        }}
                    />
                    {this.state.displayPopup ? <Popup
                        position={[
                            this.state.centerlat, this.state.centerlong
                        ]}
                        onClose={() => {
                            this.setActiveWB()
                        }}
                    >
                        <div>
                            <h3>{this.state.crop_name}</h3>
                            <p>{"Area in hectares: " + this.state.area}</p>
                            <p>{"Water Need in m^3: " + this.state.sum_of_water_need}</p>
                            <p>{"Water Need in m^3 during rainfall: " + this.state.sum_of_water_need_rainfall}</p>
                        </div>
                    </Popup> : ''}
                </Map >
            </div>
        )
    }

}
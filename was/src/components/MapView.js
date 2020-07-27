import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "./styles/MapCSS.css";
import _url from './../URL'
const axios = require('axios')

export default class MapView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeWB: null,
            setActiveWB: null,
            waterDataArray: [],
            centerlat: '',
            centerlong: ''
        }
    }
    componentWillMount() {
        this.getWaterBodies()
    }
    setActiveWB(wb) {
        this.setState({ activeWB: wb })
    }
    getWaterBodies() {
        const URL = _url + "/waterinfo/waterbodyForTaluk";
        axios.post(URL, { taluk_id: this.props.talukId }).then(res => {
            this.setState({ waterDataArray: res.data })
            this.setState({ centerlat: res.data[0].latitude })
            this.setState({ centerlong: res.data[0].longitude })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Map center={[this.state.centerlat, this.state.centerlong]} zoom={10} >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.state.waterDataArray.map(wb => (
                        < Marker key={wb.unique_id} position={[wb.latitude, wb.longitude]}
                            onClick={() => {
                                this.setActiveWB(wb);
                            }}
                        />
                    ))}
                    {
                        this.state.activeWB && (
                            <Popup
                                position={[
                                    this.state.activeWB.latitude,
                                    this.state.activeWB.longitude
                                ]}
                                onClose={() => {
                                    this.setActiveWB(null);
                                }}
                            >
                                <div>
                                    <h2>{this.state.activeWB.tank_name}</h2>
                                    <p>{this.state.activeWB.village}</p>
                                    <p>{this.state.activeWB.max_capacity}:{this.state.activeWB.available_capacitys}</p>
                                </div>
                            </Popup>
                        )
                    }
                </Map >
            </div>
        )
    }

}
import React, { Component } from "react";
import CanvasJSReact from './../canvasjs.react';
import _url from './../URL'
const axios = require('axios')
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class GraphRainfallComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataArray: []
        }
    }
    componentDidMount() {
        this.getGraphData()
    }
    getGraphData() {
        var URL
        if (this.props.mode === 1) {
            URL = _url + "/plantations/generateGraph";
        } else if (this.props.mode === 2) {
            URL = _url + "/plantations/generateGraphByDistrict"
        } else {
            URL = _url + "/plantations/generateWaterNeedByDistrict"
        }
        console.log(this.props.AreaId, this.props.mode)
        axios.post(URL, {
            id: this.props.AreaId
        }).then(res => {
            this.setState({ dataArray: res.data })
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        var options = {
            title: {
                text: "Water Need during no Rainfall Vs Water Need with Rainfall"
            },
            axisX: {
                interval: 1,
                maximum: 11
            },
            data: this.state.dataArray
        }
        console.log(options)
        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef = {ref => this.chart = ref} */
                />
            </div >
        );
    }
}
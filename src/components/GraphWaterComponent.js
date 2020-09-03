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
        var URL = _url + "/plantations/generateGraphForWaterUsage"
        console.log(this.props.AreaId)
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
            // title: {
            //     text: "Distribution of water usage of lands in the taluk"
            // },
            // axisX: {
            //     title: "Type",
            // },
            // axisY: {
            //     title: "Area in Hectares"
            // },
            // data: this.state.dataArray
            title: {
                text: "Water Usage By Land Types"
            },
            axisX: {
                interval: 1
            },
            axisY2: {
                interlacedColor: "rgba(1,77,101,.2)",
                gridColor: "rgba(1,77,101,.1)",
                title: "Area in Hectares"
            },
            data: [{
                type: "bar",
                name: "companies",
                axisYType: "secondary",
                color: "#014D65",
                dataPoints: this.state.dataArray.dataPoints
            }]
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
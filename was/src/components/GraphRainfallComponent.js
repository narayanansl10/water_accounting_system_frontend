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
    componentWillMount() {
        this.getGraphData(this.props.taluk_id)
    }
    getGraphData(taluk_id) {
        const URL = _url + "/plantations/generategraph";
        axios.post(URL, {
            taluk_id: "5f0f24351af2f8280b2b123f"
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
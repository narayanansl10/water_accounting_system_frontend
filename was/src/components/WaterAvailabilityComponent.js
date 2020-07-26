import React, { Component } from 'react'
import GaugeChart from 'react-gauge-chart'
import _url from './../URL'
const axios = require('axios')

export default class WaterAvailabilityComponent extends Component {
    state = {
        percentageFull: 0.0
    }
    componentDidMount() {
        URL = _url + '/waterinfo/waterBodyInfo'
        axios.post(URL, {
            waterbody_id: this.props.waterbodyId
        }).then(res => {
            this.setState({ percentageFull: parseFloat(res.data.percentage) })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        console.log(this.state.percentageFull)
        return (
            <div>
                <GaugeChart id="gauge-chart4"
                    nrOfLevels={10}
                    arcPadding={0}
                    percent={this.state.percentageFull}
                    cornerRadius={0}
                    textColor='#000'
                    animDelay={1000}
                    colors={['#ADD8E6', '#0000A0']}
                />
                <div>
                    Meter label
                </div>
            </div>
        )
    }
}

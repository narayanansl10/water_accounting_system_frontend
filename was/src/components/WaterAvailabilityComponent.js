import React, { Component } from 'react'
import GaugeChart from 'react-gauge-chart'
import _url from './../URL'
const axios = require('axios')

export default class WaterAvailabilityComponent extends Component {
    state = {
        percentageFull: 0.0,
        max_capacity: 0.0,
        available_capacity: 0.0
    }
    componentDidMount() {
        URL = _url + '/waterinfo/waterBodyInfo'
        axios.post(URL, {
            waterbody_id: this.props.waterbodyId
        }).then(res => {
            this.setState({ percentageFull: parseFloat(res.data.percentage) })
            this.setState({ max_capacity: parseFloat(res.data.max_capacity) })
            this.setState({ available_capacity: parseFloat(res.data.available_capacity) })
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
                    <h3 id="headertextforcomponent">{"Maximum Capacity(mcm):" + this.state.max_capacity}</h3>
                    <h3 id="headertextforcomponent">{"Available Capacity(mcm):" + this.state.available_capacity}</h3>
                </div>
            </div>
        )
    }
}

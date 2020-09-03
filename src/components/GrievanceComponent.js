import React, { Component } from 'react'
import SideDrawer from './DrawerComponent'
import HeaderBarComponent from './HeaderBarComponent'
import _url from './../URL'
import { Button } from '@material-ui/core';
import './styles/mainpagecomponent.css'
const axios = require('axios')
const jwt = require('jwt-decode')

export default class GrievanceComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            greivanceData: [],
            isDataAvailable: false,
        }
    }
    componentWillMount() {
        this.getGreivances()
    }
    getGreivances() {
        const URL = _url + "/problems/";
        axios.get(URL).then(res => {
            this.setState({ greivanceData: res.data })
            this.setState({ isDataAvailable: true })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <HeaderBarComponent history={this.props.history}></HeaderBarComponent>
                {/* <SideDrawer history={this.props.history}>
                </SideDrawer> */}
                <div>
                    <h1 id="headertextforcomponent">List of grievances to be addressed</h1>
                </div>
                <div>
                    {
                        this.state.isDataAvailable ?
                            this.state.greivanceData.map((element, index) => {
                                return (
                                    <div>
                                        <div id="greivanceelement">
                                            {index + 1}: {element.name}
                                        </div>
                                    </div>
                                )
                            }) : ''
                    }
                </div>
            </div >

        )
    }
}
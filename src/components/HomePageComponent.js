import React, { Component } from 'react'
import { Button, Container, TextField } from '@material-ui/core'
import SideDrawer from './DrawerComponent'
import MapForTalukWaterNeed from '../components/MapForTalukWaterNeed'
import HeaderBarComponent from './HeaderBarComponent'
import './styles/adminhome.css'
import GraphForTaluk from './GraphForTaluk'
import MapForTaluk from './MapForTaluk'
import GraphRainfallComponent from './GraphRainfallComponent'
import GraphForTalukWater from './GraphForTalukWater'
import GraphForDistrict from './GraphForDistrict'
import WaterBodyForTaluk from './WaterBodyForTaluk'
import ExcelForTaluk from './ExcelForTaluk'
import _url from './../URL'
const axios = require('axios')

export default class HomePageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAnnouncementReady: false,
            announcementText: false
        }
    }
    addAnnouncements = (event) => {
        const URL = _url + "/announcements/create";
        axios.post(URL, { name: this.state.announcementText }).then(res => {
            this.setState({ isAnnouncementReady: false })
            window.alert("Announcement Added")
        }).catch(err => {
            console.log(err)
        })
    }
    toggleAnnouncements = (event) => {
        this.state.isAnnouncementReady ? this.setState({ isAnnouncementReady: false }) : this.setState({ isAnnouncementReady: true })
    }
    handleChangeAdd = (event) => {
        this.setState({ announcementText: event.target.value })
    }
    render() {
        return (
            <div className="adminhome">
                <HeaderBarComponent history={this.props.history}></HeaderBarComponent>
                {/* <SideDrawer history={this.props.history}>
                </SideDrawer> */}
                <h1 id="welcometext">Welcome Administrator</h1>
                <div>
                    <h2 id="welcometext">Use Menu For Navigation</h2>
                    <Container fixed id="alignitemscenter">
                        <Button variant="contained" color="Primary" onClick={this.toggleAnnouncements}>
                            Add Announcements</Button>
                        {this.state.isAnnouncementReady ? <div id="alignitemscenter">
                            <TextField id="outlined-basic" label="Add Announcement Here" variant="outlined" onChange={this.handleChangeAdd} />
                            <Button variant="contained" color="Secondary" onClick={this.addAnnouncements}>
                                Add</Button>
                        </div> : ''
                        }
                    </Container>
                </div>
                <MapForTalukWaterNeed />
            </div>
        )
    }
}


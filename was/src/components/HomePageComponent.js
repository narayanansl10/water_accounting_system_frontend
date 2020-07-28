import React, { Component } from 'react'
import { Button, Container, TextField } from '@material-ui/core'
import SideDrawer from './DrawerComponent'
import './styles/adminhome.css'
import GraphForTaluk from './GraphForTaluk'
import MapForTaluk from './MapForTaluk'
import GraphRainfallComponent from './GraphRainfallComponent'
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
    handleGreivances = (event) => {
        this.props.history.push('/home/grievance')
    }
    clickWater = (event) => {
        this.props.history.push('/home/waterbodyfortalukupdate')
    }
    clickReport = (event) => {
        this.props.history.push('/excelfortaluk')
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
                <SideDrawer history={this.props.history}>
                </SideDrawer>
                <h1 id="welcometext">Welcome Administrator</h1>
                <div>
                    <h2 id="welcometext">Quick Access</h2>
                    <Container fixed id="alignitemscenter">
                        <Button variant="contained" color="Primary" onClick={this.handleGreivances}>
                            Grievances</Button>
                        <Button variant="contained" color="Primary" onClick={this.toggleAnnouncements}>
                            Add Announcements</Button>
                        {this.state.isAnnouncementReady ? <div id="alignitemscenter">
                            <TextField id="outlined-basic" label="Add Announcement Here" variant="outlined" onChange={this.handleChangeAdd} />
                            <Button variant="contained" color="Secondary" onClick={this.addAnnouncements}>
                                Add</Button>
                        </div> : ''

                        }
                        <Button variant="contained" color="Primary" onClick={this.clickReport}>
                            Generate Reports</Button>
                        <Button variant="contained" color="Primary" onClick={this.clickWater}>
                            Update Water Body Availability</Button>
                    </Container>

                </div>
                {/* <div>
                    <GraphRainfallComponent mode={2} AreaId={"5f0e83c87926c687298674ae"} />
                </div> */}
            </div>
        )
    }
}


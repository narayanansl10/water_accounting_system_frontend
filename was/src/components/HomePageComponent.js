import React, { Component } from 'react'
import { Button, Container, TextField } from '@material-ui/core'
import SideDrawer from './DrawerComponent'
import './styles/adminhome.css'
import GraphForTaluk from './GraphForTaluk'
import MapForTaluk from './MapForTaluk'
import GraphForDistrict from './GraphForDistrict'
import WaterBodyForTaluk from './WaterBodyForTaluk'

export default class HomePageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAnnouncementReady: false
        }
    }
    toggleAnnouncements = (event) => {
        this.state.isAnnouncementReady ? this.setState({ isAnnouncementReady: false }) : this.setState({ isAnnouncementReady: true })
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
                        <Button variant="contained" color="Primary" >
                            Grievances</Button>
                        <Button variant="contained" color="Primary" onClick={this.toggleAnnouncements}>
                            Add Announcements</Button>
                        {this.state.isAnnouncementReady ? <div id="alignitemscenter">
                            <TextField id="outlined-basic" label="Add Announcement Here" variant="outlined" onChange={this.handleChangeAdd} />
                            <Button variant="contained" color="Secondary" onClick={this.addAnnouncements}>
                                Add</Button>
                        </div> : ''

                        }
                        <Button variant="contained" color="Primary" >
                            Generate Reports</Button>
                        <Button variant="contained" color="Primary" >
                            View Contacts</Button>
                    </Container>

                </div>
                {/* <div><GraphForTaluk /></div> */}
                {/* <div>
                    <GraphForDistrict />
                </div> */}
                {/* <div>
                    <WaterBodyForTaluk />
                </div> */}
                <div>
                    <MapForTaluk />
                </div>

            </div>
        )
    }
}


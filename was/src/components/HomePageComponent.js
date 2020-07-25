import React, { Component } from 'react'
import { Button, Container, TextField } from '@material-ui/core'
import SideDrawer from './DrawerComponent'
import GraphRainfallComponent from './GraphRainfallComponent'
import './styles/adminhome.css'
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
                {/* <GraphRainfallComponent mode={1} AreaId={'5f0f24351af2f8280b2b123f'} /> */}
            </div>
        )
    }
}


import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIconRounded from '@material-ui/icons/Menu';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import DataUsageRoundedIcon from '@material-ui/icons/DataUsageRounded';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import './styles/drawer.css'

export default class SideDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            left: false
        }
    }
    toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ left: open })
    };
    handleLogout = (text) => (event) => {
        localStorage.removeItem('token')
        this.props.history.push("/")
    }
    handleHome = (text) => (event) => {
        this.props.history.push("/home")
    }
    handleGraphs = (text) => (event) => {
        this.props.history.push("/graphfortaluk")
    }
    handleMaps = (text) => (event) => {
        this.props.history.push("/mapfortaluk")
    }
    handleDataEdit = (text) => (event) => {
        this.props.history.push("/home")
    }
    handleWaterBody = (text) => (event) => {
        this.props.history.push("/waterbodyfortaluk")
    }
    handleDistrictwiseData = (text) => (event) => {
        this.props.history.push("/home")
    }

    list = (anchor) => (
        <div
            id='SelectList'
            role="presentation"
            onClick={this.toggleDrawer(anchor, false)}
            onKeyDown={this.toggleDrawer(anchor, false)}
        >
            <List>
                {['Home'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon onClick={this.handleHome(text)}>{<HomeRoundedIcon />}</ListItemIcon>
                        <ListItemText primary={text} onClick={this.handleHome(text)} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Graphs'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon onClick={this.handleGraphs(text)}>{<ShowChartRoundedIcon />}</ListItemIcon>
                        <ListItemText primary={text} onClick={this.handleGraphs(text)} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Maps'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon onClick={this.handleMaps(text)}>{<ExploreRoundedIcon />}</ListItemIcon>
                        <ListItemText primary={text} onClick={this.handleMaps(text)} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Districtwise Data'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon onClick={this.handleDistrictwiseData(text)}>{<BarChartRoundedIcon />}</ListItemIcon>
                        <ListItemText primary={text} onClick={this.handleDistrictwiseData(text)} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Waterbody Information'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon onClick={this.handleWaterBody(text)}>{<DataUsageRoundedIcon />}</ListItemIcon>
                        <ListItemText primary={text} onClick={this.handleWaterBody(text)} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['DataEdit'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon onClick={this.handleDataEdit(text)}>{<StorageRoundedIcon />}</ListItemIcon>
                        <ListItemText primary={text} onClick={this.handleDataEdit(text)} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Logout'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon onClick={this.handleLogout(text)}>{<PowerSettingsNewRoundedIcon />}</ListItemIcon>
                        <ListItemText primary={text} onClick={this.handleLogout(text)} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    render() {
        return (
            <div>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={this.toggleDrawer(anchor, true)}>{<MenuIconRounded />}</Button>
                        <Drawer anchor={anchor} open={this.state[anchor]} onClose={this.toggleDrawer(anchor, false)}>
                            {this.list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
        );
    }
}
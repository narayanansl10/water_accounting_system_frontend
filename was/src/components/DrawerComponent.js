import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIconRounded from '@material-ui/icons/Menu';
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
    list = (anchor) => (
        <div
            id='SelectList'
            role="presentation"
            onClick={this.toggleDrawer(anchor, false)}
            onKeyDown={this.toggleDrawer(anchor, false)}
        >
            <List>
                {['Graphs', 'Maps', 'Data Edit', 'Greivances'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? "ICON" : "ICON"}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Logout'].map((text, index) => (
                    <ListItem button key={text}>
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
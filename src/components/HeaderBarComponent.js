import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideDrawer from './DrawerComponent'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GOIImage from '../assets/goi2.png'
import CWCImage from '../assets/cwc.jpg'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <SideDrawer history={props.history}></SideDrawer>
                <Toolbar>
                    <img src={CWCImage} style={{ width: '5%', height: '5%' }}></img>
                    <Typography variant="h4" align='center' className={classes.title}>
                        Central Water Commmission, Ministry of Jal Shakti
                    </Typography>
                    <img src={GOIImage} style={{ width: '5%', height: '5%' }}></img>
                </Toolbar>
            </AppBar>
        </div >
    );
}

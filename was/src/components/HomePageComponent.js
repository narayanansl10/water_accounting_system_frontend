import React, { Component } from 'react'
import SideDrawer from './DrawerComponent'

export default class HomePageComponent extends Component {
    render() {
        return (
            <div>
                <SideDrawer history={this.props.history}>
                </SideDrawer>
                ADMIN Home Page works!
            </div>
        )
    }
}


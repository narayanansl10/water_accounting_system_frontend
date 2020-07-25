import React, { Component } from 'react'
import SideDrawer from './DrawerComponent'
import GraphRainfallComponent from './GraphRainfallComponent'

export default class HomePageComponent extends Component {
    render() {
        return (
            <div>
                <SideDrawer history={this.props.history}>
                </SideDrawer>
                <GraphRainfallComponent mode={1} AreaId={'5f0f24351af2f8280b2b123f'} />
            </div>
        )
    }
}


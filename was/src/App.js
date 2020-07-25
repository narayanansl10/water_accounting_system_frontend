import React from 'react';
import LoginForm from './components/LoginForm'
import HomePageComponent from './components/HomePageComponent'
import LogoutComponent from './components/LogoutComponent'
import RegisterCropComponent from './components/RegisterCropComponent'
import RegisterUserComponent from './components/RegisterUserComponent'
import MapViewComponent from './components/MapView'
import GraphRainfallComponent from './components/GraphRainfallComponent'
import WaterAvailabilityComponent from './components/WaterAvailablilityComponent'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/register" component={RegisterUserComponent} />
          <Route exact path="/home" component={HomePageComponent} />
          <Route exact path="/userhome" component={RegisterCropComponent} />
          <Route exact path="/logout" component={LogoutComponent} />
          <Route exact path='/mapview' component={MapViewComponent} />
          <Route exact path='/graphrainfall' component={GraphRainfallComponent} />
          <Route exact path='/wateravailable' component={WaterAvailabilityComponent} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

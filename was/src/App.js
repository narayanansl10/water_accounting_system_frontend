import React from 'react';
import LoginForm from './components/LoginForm'
import HomePageComponent from './components/HomePageComponent'
import LogoutComponent from './components/LogoutComponent'
import GrievanceComponent from './components/GrievanceComponent'
import RegisterCropComponent from './components/RegisterCropComponent'
import RegisterUserComponent from './components/RegisterUserComponent'
import GraphForTaluk from './components/GraphForTaluk'
import WaterBodyForTaluk from './components/WaterBodyForTaluk'
import ExcelForTaluk from './components/ExcelForTaluk'
import MapForTaluk from './components/MapForTaluk'
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
          <Route exact path='/graphfortaluk' component={GraphForTaluk} />
          <Route exact path='/excelfortaluk' component={ExcelForTaluk} />
          <Route exact path='/mapfortaluk' component={MapForTaluk} />
          <Route exact path='/waterbodyfortaluk' component={WaterBodyForTaluk} />
          <Route exact path='/home/grievance' component={GrievanceComponent} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

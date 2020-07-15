import React from 'react';
import LoginForm from './components/LoginForm'
import HomePageComponent from './components/HomePageComponent'
import LogoutComponent from './components/LogoutComponent'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/home" component={HomePageComponent} />
          <Route path="/logout" component={LogoutComponent} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

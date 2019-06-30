import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Home from './Components/Home/Home'
import LandingPage from './Components/Landing/LandingPage'
import Callback from './Components/Callback/Callback'
import Navbar from './Components/Layout/Navbar'
import AppContainer from './StyleComponents/container'

import { Auth0Provider } from './Components/Auth/react-auth0-wrapper'
import { authClientId, authDomain } from './utils/constants'
import PrivateRoute from './Components/Auth/privateRoute'

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
  )
}

const Routes = () => {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={authDomain}
        client_id={authClientId}
        redirect_uri={window.location.origin} // takes user back to view they had prior to clicking "log in" // can use /callback route to intercept and do stuff fi we want to
        onRedirectCallback={onRedirectCallback}
      >
        <Navbar />
        <AppContainer>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/callback" component={Callback} />
          </Switch>
        </AppContainer>
      </Auth0Provider>
    </BrowserRouter>
  )
}

export default Routes

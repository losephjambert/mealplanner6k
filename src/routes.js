import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from './utils/history'

import Home from './Components/Home/Home'
import LandingPage from './Components/Landing/LandingPage'
import Callback from './Components/Callback/Callback'
import Navbar from './Components/Layout/Navbar'
import AppContainer from './StyleComponents/container'
import App from './App'

import auth from './Components/Auth/Auth'

import { ApolloProvider } from 'react-apollo'
import makeApolloClient from './apollo'

let client

const provideClient = (Component, renderProps) => {
  // check if logged in
  if (localStorage.getItem('isLoggedIn') === 'true') {
    if (!client) client = makeApolloClient()
    return (
      <ApolloProvider client={client}>
        <Component {...renderProps} auth={auth} client={client} />
      </ApolloProvider>
    )
  } else {
    // not logged in already, hence redirect to login page
    if (renderProps.match.path !== '/') {
      window.location.href = '/'
    } else {
      return <Component auth={auth} {...renderProps} />
    }
  }
}

const handleAuthentication = props => {
  if (/access_toke|id_toke|error/.test(props.location.hash)) {
    auth.handleAuthentication()
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <App auth={auth}>
        <Route path="/" render={props => provideClient(Navbar, props)}></Route>
        <AppContainer>
          <Route exact path="/" render={props => provideClient(LandingPage, props)} />
          <Route exact path="/home" render={props => provideClient(Home, props)} />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props)
              return <Callback {...props} />
            }}
          />
        </AppContainer>
      </App>
    </Router>
  )
}

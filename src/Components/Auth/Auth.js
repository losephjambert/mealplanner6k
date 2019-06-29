import history from '../../utils/history'
import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'

class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid profile'
  })
  constructor() {
    this.accessToken = null
    this.idToken = null
    this.expiresAt = null
    this.sub = null
    this.user = null
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getIdToken = this.getIdToken.bind(this)
    this.renewSession = this.renewSession.bind(this)
    this.silentAuth = this.silentAuth.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        // store in db
        this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
          // Now you have the user's information
          // The code to insert this user info to db has been handled at Auth0 Rule.
          console.log('User Info: ', user)
          this.setUser(user)
        })
      } else if (err) {
        history.replace('/home')
        // window.location.href="/home";
        console.error(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setUser(user) {
    this.user = user
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true')

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.expiresAt = expiresAt
    this.sub = authResult.idTokenPayload.sub

    // navigate to the home route
    history.replace('/home')
    // window.location.href="/home";
  }

  getAccessToken() {
    return this.accessToken
  }

  getIdToken() {
    return this.idToken
  }

  getSub() {
    return this.sub
  }

  renewSession() {
    const _this = this
    return new Promise((resolve, reject) => {
      _this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          _this.setSession(authResult)
          resolve(authResult)
        } else if (err) {
          _this.logout()
          reject(err)
        }
      })
    })
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null
    this.idToken = null
    this.expiresAt = 0

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn')

    // navigate to the home route
    // history.replace('/')
    // window.location.href="/home";
    this.auth0.logout({
      returnTo: 'http://localhost:3000/',
      clientId: AUTH_CONFIG.clientId
    })
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt
    return new Date().getTime() < expiresAt
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err)
        this.setSession(authResult)
        resolve()
      })
    })
  }
}

const auth = new Auth()

export default auth

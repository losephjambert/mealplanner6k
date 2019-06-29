import { useEffect } from 'react'
import auth from './Components/Auth/Auth'

// Need to refactor this implementation of silentAuth. Right now
// it results in a poor user experience. The user navigates to the
// root component and is presented with the LandingPage component.
// Once the silentAuth succeeds, the app re-renders and loads
// the Home component. There needs to be some state change awareness,
// otherwise it feels clunky and the user doesn't know what's going on.

const App = props => {
  useEffect(() => {
    async function silentAuthCheck() {
      try {
        await auth.silentAuth()
      } catch (err) {
        if (err.error !== 'login_required') console.log('silentAuth error: ', err.error)
      }
    }
    silentAuthCheck()
  })
  return [props.children]
}

export default App

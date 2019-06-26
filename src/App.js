import { useEffect } from 'react'
import auth from './Components/Auth/Auth'

const App = props => {
  console.log('App.js', props)
  useEffect(() => {
    async function silentAuthCheck() {
      try {
        console.log('async silentauthcheck: ', auth)
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

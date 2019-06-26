import ReactDOM from 'react-dom'
import { makeMainRoutes } from './routes'

import './css/index.css'
import './css/fonts.css'

import * as serviceWorker from './serviceWorker'

const ROUTES = makeMainRoutes()
ReactDOM.render(ROUTES, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

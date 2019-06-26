// import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { WebSocketLink } from 'apollo-link-ws'
// import { split } from 'apollo-link'
// import { getMainDefinition } from 'apollo-utilities'
// import { SubscriptionClient } from 'subscriptions-transport-ws'

// import { GRAPHQL_URL, REALTIME_GRAPHQL_URL } from './utils/constants'

import ApolloClient from 'apollo-boost'
import { GRAPHQL_URL } from './utils/constants'
import auth from './Components/Auth/Auth'

const getHeaders = () => {
  const headers = {}
  const token = auth.getIdToken()
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  return headers
}

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  fetch,
  headers: getHeaders()
})

console.log('apollo file', client)

export default client

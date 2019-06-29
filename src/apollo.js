import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { GRAPHQL_URL, REALTIME_GRAPHQL_URL } from './utils/constants'
import auth from './Components/Auth/Auth'

const getHeaders = () => {
  const headers = {}
  const token = auth.getIdToken()
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  return headers
}

// todo:
// study this file for cache implementation to learn how this setup handles caching

const makeApolloClient = () => {
  // Create an http link:
  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    fetch,
    headers: getHeaders()
  })

  // Create a WebSocket link:
  const wsLink = new WebSocketLink(
    new SubscriptionClient(REALTIME_GRAPHQL_URL, {
      reconnect: true,
      timeout: 30000,
      connectionParams: () => {
        return { headers: getHeaders() }
      },
      connectionCallback: err => {
        if (err) {
          console.log('apollo websocket connectionCallback error', err)
          wsLink.subscriptionClient.close(false, false)
        }
      }
    })
  )

  // choose the link to use based on operation
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
      addTypename: true
    })
  })

  return client
}

export default makeApolloClient

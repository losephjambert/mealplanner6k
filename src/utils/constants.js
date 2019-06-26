const HASURA_GRAPHQL_ENGINE_HOSTNAME = 'meal-planner-6000.herokuapp.com'
const HASURA_GRAPHQL_ENGINE_LOCALHOST = 'localhost:3000'

const scheme = proto => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto
}

export const GRAPHQL_URL = `${scheme('http')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`

export const REALTIME_GRAPHQL_URL = `${scheme(
  'wss'
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`

export const authClientId = 'y9AC5ALBhsUGoaBdpVAOOTszDm4IPQsF'

export const authDomain = 'dev-cashstasher.auth0.com'

export const callbackUrl = `${scheme('http')}://${HASURA_GRAPHQL_ENGINE_LOCALHOST}/callback`

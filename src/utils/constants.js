const LOCALHOST = 'localhost:3000'

const scheme = proto => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto
}

export const authClientId = 'y9AC5ALBhsUGoaBdpVAOOTszDm4IPQsF'

export const authDomain = 'dev-cashstasher.auth0.com'

export const callbackUrl = `${scheme('http')}://${LOCALHOST}/callback`

export const audience = 'https://mealplannerapi.joseph.pizza'

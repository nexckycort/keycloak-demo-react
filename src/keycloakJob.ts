import keycloak from 'lib/keycloak'

// Flow can be changed to 'implicit' or 'hybrid', but then client must enable implicit flow in admin console too
const initOptions: Keycloak.KeycloakInitOptions = {
  responseMode: 'fragment',
  flow: 'hybrid'
}

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
export const initKeycloak = (onAuthenticatedCallback: Function): void => {
  keycloak
    .init(initOptions)
    .then((authenticated: boolean) => {
      if (authenticated) {
        localStorage.setItem('token', keycloak.token ?? '')
        setTimeout(() => {
          keycloak
            .updateToken(60)
            .then((refreshed: boolean) => {
              if (refreshed) {
                console.debug('Token refreshed')
              } else {
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                console.warn(`Token not refreshed, valid for ${Math.round((keycloak?.tokenParsed?.exp ?? 0) + (keycloak?.timeSkew ?? 0) - new Date().getTime() / 1000)} seconds`)
              }
            })
            .catch(() => {
              console.error('Failed to refresh token')
            })
        }, 12000)
      } else {
        localStorage.removeItem('token')
        keycloak.login()
      }
      onAuthenticatedCallback()
    })
    .catch((error) => console.log('Init Error', error))
}

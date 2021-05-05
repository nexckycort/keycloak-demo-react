import React from 'react'
import logo from './logo.svg'
import './App.css'

import keycloak from 'lib/keycloak'

function App(): JSX.Element {
  const logout = (): void => {
    keycloak.logout()
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="#" onClick={logout} rel="noopener noreferrer">
          Logout
        </a>
      </header>
    </div>
  )
}

export default App

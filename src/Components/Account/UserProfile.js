import React from 'react'
import { useAuth0 } from '../Auth/react-auth0-wrapper'

const UserProfile = () => {
  const { user } = useAuth0()
  return (
    <section>
      {user && <h1>Hello {user.name}</h1>}
      <h2>Recipes</h2>
      <ul>
        <li>recipe 1</li>
        <li>recipe 2</li>
        <li>recipe 3</li>
        <li>... recipe n</li>
      </ul>
    </section>
  )
}

export default UserProfile

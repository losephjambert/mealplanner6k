import React from 'react'
// import styled from 'styled-components'
import { useAuth0 } from '../Auth/react-auth0-wrapper'
import { Link } from 'react-router-dom'

// import { NavHeight } from '../../Style/constants'
// import Button from '../../Style/button'

// const Nav = styled.nav``

// const NavCrumbs = styled.ul`
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: space-between;
//   align-items: center;
//   list-style-type: none;
//   margin: 0;
//   padding: 0 15px;
//   height: ${NavHeight}px;
//   border-bottom: 1px solid var(--main-dark-color);
// `

// const NavItem = styled.li`
//   font-size: 1.5rem;
// `

// const NavNavLink = styled(Link)`
//   color: var(--main-text-color);
//   text-decoration: none;
//   font-weight: 700;
//   &:hover {
//     color: var(--main-color);
//   }
// `

const Navbar = props => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <nav>
      {!isAuthenticated && (
        <>
          <button onClick={() => loginWithRedirect({})}>Log in</button>
          <Link to="/">Landing Page</Link>
        </>
      )}

      {isAuthenticated && (
        <>
          <button onClick={() => logout()}>Log out</button>
          <Link to="/external-api">External API</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar

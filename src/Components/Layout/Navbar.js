import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { NavHeight } from '../../StyleComponents/constants'
import Button from '../../StyleComponents/button'

const Nav = styled.nav``

const NavCrumbs = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0 15px;
  height: ${NavHeight}px;
  border-bottom: 1px solid var(--main-dark-color);
`

const NavItem = styled.li`
  font-size: 1.5rem;
`

const NavNavLink = styled(Link)`
  color: var(--main-text-color);
  text-decoration: none;
  font-weight: 700;
  &:hover {
    color: var(--main-color);
  }
`

const Navbar = props => {
  const { isAuthenticated, login, logout } = props.auth
  console.log('Navbar', props)

  let AuthButton = !isAuthenticated() ? (
    <Button onClick={() => login()}>Log In</Button>
  ) : (
    <Button onClick={() => logout()}>Log Out</Button>
  )

  let NavLink = !isAuthenticated() ? (
    <NavNavLink to="/">MealPlanner6000</NavNavLink>
  ) : (
    <NavNavLink to="/home">MealPlanner6000</NavNavLink>
  )

  return (
    <Nav>
      <NavCrumbs>
        <NavItem>{NavLink}</NavItem>
        <NavItem>{AuthButton}</NavItem>
      </NavCrumbs>
    </Nav>
  )
}

export default Navbar

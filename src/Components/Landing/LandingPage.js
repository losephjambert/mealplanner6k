import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../StyleComponents/button'

const Section = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column wrap;

  h2 {
    font-size: 3rem;
  }

  p {
    font-size: 1.6rem;
    text-align: center;
    &:last-child {
      margin-top: 100px;
    }
    span {
      display: block;
      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }
`

const LandingPage = props => {
  const { isAuthenticated, login } = props.auth
  return (
    <Section>
      <h2>Hello user!</h2>
      {isAuthenticated() && (
        <p>
          Head to your <Link to="/home">dashboard</Link>
        </p>
      )}
      {!isAuthenticated() && (
        <>
          <p>
            <span>Welcome to the super duper automated</span>
            <span>(with minimal manual input)</span>
            <span>MealPlanner6000</span>
          </p>
          <p>
            Please <Button onClick={() => login()}>Log In</Button> to continue.
          </p>
        </>
      )}
    </Section>
  )
}

export default LandingPage

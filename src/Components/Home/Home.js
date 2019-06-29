import React from 'react'
import RecipeList from '../Recipe/RecipeList'

const Home = props => {
  return (
    <div>
      <h1>MealPlanner6000</h1>
      <div>
        <RecipeList {...props} />
      </div>
    </div>
  )
}

export default Home

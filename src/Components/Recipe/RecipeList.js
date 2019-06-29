import React, { useEffect } from 'react'
import { QUERY_USER_RECIPES } from './RecipeQueries'

const RecipeList = props => {
  const { client, auth } = props
  //query for users recipes
  let userId = auth.sub
  async function fetchRecipes(userId) {
    try {
      await client
        .query({
          query: QUERY_USER_RECIPES,
          variables: { userId }
        })
        .then(data => {
          console.log(data)
        })
    } catch (err) {
      console.log('Recipes List error: ', err)
    }
  }

  // useEffect(() => {
  //   fetchRecipes(userId)
  // })
  userId && fetchRecipes(userId)
  return (
    userId && (
      <ul>
        <li>Recipes</li>
      </ul>
    )
  )
}

export default RecipeList

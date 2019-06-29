import gql from 'graphql-tag'

const TODO_FRAGMENT = gql`
  fragment TodoFragment on todos {
    id
    text
    is_completed
    created_at
    is_public
  }
`

const RECIPE_FRAGMENT = gql`
  fragment RecipeFragment on recipes {
    id
    is_public
    url
    title
    ingredients
    tags
  }
`

const USER_FRAGMENT = gql`
  fragment UserFragment on users {
    name
  }
`

const QUERY_USER_RECIPES = gql`
  query($userId: String!) {
    recipes(
      where: { is_public: { _eq: false }, user_id: { _eq: $userId } }
      order_by: { created_at: desc }
    ) {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`

const QUERY_PRIVATE_TODO = gql`
  query fetch_todos($userId: String!) {
    todos(
      where: { is_public: { _eq: false }, user_id: { _eq: $userId } }
      order_by: { created_at: desc }
    ) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`
export { QUERY_USER_RECIPES, QUERY_PRIVATE_TODO }

import gql from 'graphql-tag'

const R_TODO_FRAGMENT = gql`
  fragment TodoFragment on todos {
    id
    text
    is_completed
    created_at
    is_public
  }
`

const R_USER_FRAGMENT = gql`
  fragment UserFragment on users {
    name
  }
`

const R_QUERY_PRIVATE_TODO = gql`
  query fetch_todos($userId: String!) {
    todos(
      where: { is_public: { _eq: false }, user_id: { _eq: $userId } }
      order_by: { created_at: desc }
    ) {
      ...TodoFragment
    }
  }
  ${R_TODO_FRAGMENT}
`

const R_QUERY_PUBLIC_TODO = gql`
  query fetch_todos($todoLimit: Int, $todoId: uuid) {
    todos(
      where: { is_public: { _eq: true }, id: { _gt: $todoId } }
      order_by: { created_at: desc }
      limit: $todoLimit
    ) {
      ...TodoFragment
      user {
        ...UserFragment
      }
    }
  }
  ${R_TODO_FRAGMENT}
  ${R_USER_FRAGMENT}
`

const R_QUERY_FEED_PUBLIC_TODO = gql`
  query fetch_todos($todoId: uuid) {
    todos(
      where: { is_public: { _eq: true }, id: { _gt: $todoId } }
      order_by: { created_at: desc }
    ) {
      ...TodoFragment
      user {
        ...UserFragment
      }
    }
  }
  ${R_TODO_FRAGMENT}
  ${R_USER_FRAGMENT}
`

const R_QUERY_FEED_PUBLIC_OLD_TODO = gql`
  query fetch_todos($todoId: uuid) {
    todos(
      where: { is_public: { _eq: true }, id: { _lt: $todoId } }
      limit: 5
      order_by: { created_at: desc }
    ) {
      ...TodoFragment
      user {
        ...UserFragment
      }
    }
  }
  ${R_TODO_FRAGMENT}
  ${R_USER_FRAGMENT}
`

const R_MUTATION_TODO_ADD = gql`
  mutation insert_todos($objects: [todos_insert_input!]!) {
    insert_todos(objects: $objects) {
      affected_rows
      returning {
        id
        text
        is_completed
        created_at
        is_public
      }
    }
  }
`

const R_MUTATION_TODO_UPDATE = gql`
  mutation update_todos($todoId: uuid, $set: todos_set_input!) {
    update_todos(where: { id: { _eq: $todoId } }, _set: $set) {
      affected_rows
    }
  }
`

const R_MUTATION_TODO_DELETE = gql`
  mutation delete_todos($todoId: uuid) {
    delete_todos(where: { id: { _eq: $todoId } }) {
      affected_rows
    }
  }
`

const R_SUBSCRIPTION_TODO_PUBLIC_LIST = gql`
  subscription($todoId: uuid) {
    todos(
      where: { is_public: { _eq: true }, id: { _gt: $todoId } }
      order_by: { created_at: desc }
      limit: 1
    ) {
      id
      text
      is_completed
      created_at
      is_public
    }
  }
`

export {
  R_QUERY_PRIVATE_TODO,
  R_QUERY_PUBLIC_TODO,
  R_QUERY_FEED_PUBLIC_TODO,
  R_QUERY_FEED_PUBLIC_OLD_TODO,
  R_MUTATION_TODO_ADD,
  R_MUTATION_TODO_UPDATE,
  R_MUTATION_TODO_DELETE,
  R_SUBSCRIPTION_TODO_PUBLIC_LIST
}

import styled from 'styled-components'

const Button = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  transition: 250ms;
  border: 1px solid var(--main-dark-color);
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
    background-color: var(--main-color);
  }
`

export default Button

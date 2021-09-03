import React, { useEffect, useReducer, useState } from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import axios from 'axios'

const site1Theme = {
  colors: {
    primary: 'black'
  },
  backgroundColors: {
    primary: '#eee'
  }
}

const site2Theme = {
  colors: {
    primary: 'white'
  },
  backgroundColors: {
    primary: '#aaa'
  }
}

const initialState = {
  isLoading: false,
  isError: false,
  persons: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_PERSONS':
      return {
        ...state,
        isLoading: true
      }

    case 'FETCH_PERSONS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        persons: action.payload.persons
      }

    case 'FETCH_PERSONS_FAILURE':
      return {
        ...state,
        isError: true,
        isLoading: false
      }
  }
}

export function App() {
  const { theme, toggleTheme } = useSiteTheme()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'FETCH_PERSONS' })

      try {
        const response = await axios.get('http://localhost:8889/persons')

        dispatch({
          type: 'FETCH_PERSONS_SUCCESS',
          payload: { persons: response.data.data.persons }
        })
      } catch (e) {
        dispatch({ type: 'FETCH_PERSONS_FAILURE' })
      }
    }

    fetchData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />

        <button onClick={toggleTheme}>Change site</button>

        {state.isLoading && <div>Loading..</div>}

        {state.isError && <div>Ooops, there was an error.</div>}

        {state.persons.map((person) => (
          <div>
            {person.uuid}: {person.firstName} {person.lastName}
          </div>
        ))}
      </div>
    </ThemeProvider>
  )
}

function useSiteTheme() {
  const [site, setSite] = useState('two')

  const toggleTheme = () => {
    setSite(site === 'one' ? 'two' : 'one')
  }

  const theme = site === 'two' ? site2Theme : site1Theme

  return {
    theme,
    toggleTheme
  }
}

function Header() {
  return (
    <header>
      <Title>Welcome to Fraktio's training</Title>
    </header>
  )
}

const Title = styled.h1((props) => ({
  color: props.theme.colors.primary,
  fontSize: '22px',
  backgroundColor: props.theme.backgroundColors.primary
}))

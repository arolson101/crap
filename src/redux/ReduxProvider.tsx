import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/index'

const store = createStore(reducer)

export const ReduxProvider: React.SFC = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
)

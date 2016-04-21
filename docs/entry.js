import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { testData } from './data'

ReactDOM.render(
  <App someDivs={ testData } />,
  document.querySelector('#app')
)

import React from 'react'
import HorizontalScroll from '..'
import './css/index.css'


class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {

    const exampleItems = this.props.someDivs.map((item, i) => {
      return (
        <div key={ i } className='tile'>
          <h1>{ item.text }</h1>
        </div>
      )
    })

    return (
      <div style={{ height: `100vh` }}>
          <HorizontalScroll pageLock={ true }>
            { exampleItems }
          </HorizontalScroll>
      </div>
    )
  }
}

export default App

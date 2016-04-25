import React  from 'react'
import HorizontalScroll  from '../dist/react-horizontal-scroll'
import './css/index.css'

export default class App extends React.Component {
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
      <main>
        <h1 className='center'>Full Width</h1>
        <div style={{ height: `16.7vh`}} >
            <HorizontalScroll pageLock={ true } reverseScroll={ true }>
              { exampleItems }
            </HorizontalScroll>
        </div>
        <h1 className='center'>Some Other Width</h1>
        <div style={{ height: `16.7vh`, width: `66%`}} >
            <HorizontalScroll>
              { exampleItems }
            </HorizontalScroll>
        </div>
      </main>
    )
  }
}

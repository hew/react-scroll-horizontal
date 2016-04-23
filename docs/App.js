import React  from 'react'
import HorizontalScroll  from '../src/react-horizontal-scroll'
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
      <main>

        <h1 className='center'>Full Width</h1>
        <div style={{ height: `66.6vh`}}>
            <HorizontalScroll pageLock={ true } reverseScroll={ true } width={`66.6%`}>
              { exampleItems }
            </HorizontalScroll>
        </div>

        {/*<h1 className='center'>Some Other Width</h1>
        <div style={{ height: `33vh`, width: `66%`, overflow: `hidden`}}>
            <HorizontalScroll >
              { exampleItems }
            </HorizontalScroll>
        </div>*/}

      </main>
    )
  }
}

export default App

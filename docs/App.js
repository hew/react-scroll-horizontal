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
        <h2>{ item.text }</h2>
      </div>
      )
    })
    return (
      <main>

        <div className="center w50 mx-auto mb">
          <h1 className='dots'>React Horizontal Scroll</h1>
          <h3>
            Feed 	&lt;HorizontalScroll&gt; one child, or many children.
            So long as they have a defined width/height, this component will
            take care of the rest.
          </h3>
          <div className="flex justify-center">
            <iframe src="https://ghbtns.com/github-btn.html?user=hew&repo=react-horizontal-scroll&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
          </div>
        </div>
        <div className="hr"></div>
        <h1 className='center'>Full Width</h1>
        <div style={{ height: `22.7em`}}>
            <HorizontalScroll>
              { exampleItems }
            </HorizontalScroll>
        </div>
        <div className="hr"></div>
        <h1 className='center'>Arbitrary Width</h1>
        <div style={{ height: `22.7em`, width: `66%`}} >
            <HorizontalScroll>
              { exampleItems }
            </HorizontalScroll>
        </div>
        <footer>
          <p>Made by <a href="http://github.com/hew">hew</a></p>
        </footer>
      </main>
    )
  }
}

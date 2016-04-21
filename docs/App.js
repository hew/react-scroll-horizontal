import React from 'react'
import HorizontalScroll from '..'

class App extends React.Component {
  render () {
    return (
      <div style={{ height: `100vh` }}>
          <HorizontalScroll pageLock={ true }>
            <div style={{width: `30em`, height: `100%`, backgroundColor: `blue`}}>beep</div>
            <div style={{width: `30em`, height: `100%`, backgroundColor: `red`}}>beep</div>
            <div style={{width: `30em`, height: `100%`, backgroundColor: `blue`}}>beep</div>
            <div style={{width: `30em`, height: `100%`, backgroundColor: `red`}}>beep</div>
            <div style={{width: `30em`, height: `100%`, backgroundColor: `blue`}}>beep</div>
            <div style={{width: `30em`, height: `100%`, backgroundColor: `red`}}>beep</div>
          </HorizontalScroll>
      </div>
    )
  }
}

export default App

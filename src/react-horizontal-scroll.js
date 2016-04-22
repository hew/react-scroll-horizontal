
import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

export default class HorizontalScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animValues: 0
    }
  }
  componentDidMount() {
    if (this.props.pageLock) {
      const orig = document.firstElementChild.className;
      document.firstElementChild.className = orig + (orig ? ' ' : '') + 'locked__';
    }
  }
  componentWillUnmount() {
    document.firstElementChild.className =
    document.firstElementChild.className.replace(/ ?locked__/, '');
  }
  componentDidUpdate (nextProps, nextState) {
    const curr = this.state.animValues
    const max = this.refs.scrollContainer.scrollWidth
    const win = this.refs.scrollContainer.offsetParent.offsetWidth
    const bounds = -(max - win)
    if (curr >= 1) {
      this._resetMin()
    }
    if (curr <= bounds) {
      let x = bounds + 1
      this._resetMax(x)
    }
  }
  _onScrollStart = (e) => {
      e.preventDefault()
      let curr = this.state.animValues
      if (this.props.reverseScroll) {
        let mouseReverse = -(e.deltaY)
        this.setState({ animValues: curr + mouseReverse })
      }
      let mouse = e.deltaY
      this.setState({ animValues: curr + mouse })
  }
  _resetMin = () => {
    this.setState({ animValues: 0 })
  }
  _resetMax = (x) => {
    this.setState({ animValues: x })
  }
  render() {
    const { width, height } = this.props
    const styles = {
       outline: `2px solid red`,
       height: width ? width : `100%`,
       width: width ? width : `100%`
    }
    return(
      <div
        onWheel={this._onScrollStart}
        ref='scrollContainer'
        className='scroll-container'
        style={styles}
        >
        <Motion
          style={{
            z: spring(this.state.animValues, presets.noWobble)
          }}>
        {({z}) => {
        const scrolls = {
          transform: `translate3d(${z}px, 0,0)`,
          display: `inline-flex`,
          height: `100%`
        }
        return (
             <div style={scrolls} >
               { this.props.children }
              </div>
             )
           }}
         </Motion>
      </div>
     )
   }
}

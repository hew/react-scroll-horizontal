import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, spring, presets } from 'react-motion'
import throttle from 'lodash.throttle'

export default class HorizontalScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDeltas: 0,  // Gathered from mousewheel
      animValues: 0      // Fed to React Motion
    }
    this._onScrollStart = this._onScrollStart.bind(this)
    this._resetMin      = this._resetMin.bind(this)
    this._resetMax      = this._resetMax.bind(this)
  }
  componentDidMount() {
    // Place the 'lock__' class on the HTML element - if toggled
    if (this.props.pageLock) {
      const orig = document.firstElementChild.className;
      document.firstElementChild.className = orig + (orig ? ' ' : '') + 'locked__';
    }

    // Calculate the bounds of the scroll area
    this.max = this.refs.hscrollContainer.lastElementChild.scrollWidth
    this.win = this.refs.hscrollContainer.offsetWidth
    this.setState({animValues: this.win})

  }
  componentWillUnmount() {
    if (this.props.pageLock) {
    document.firstElementChild.className =
    document.firstElementChild.className.replace(/ ?locked__/, '');
    }
  }
  componentDidUpdate (nextProps, nextState) {

    let curr = this.state.animValues
    let { max, win } = this

    const bounds = -(max - win)
    if (curr >= 1) {
      this._resetMin()
    }
    if (curr <= bounds) {
      let x = bounds + 1
      this._resetMax(x)
    }
  }
  _onScrollStart (e) {
      e.preventDefault()
      let mouseY = e.deltaY
      // Bring in the existing animation values
      let animationValue  = this.state.animValues
      // Adds the reverse toggle for the component
      let mouseYReverse   = -(mouseY)
      // Calculate the new animation value(s)
      let newAnimationValue          = animationValue + mouseY
      let newAnimationValueNegative  = animationValue + mouseYReverse

      const scrolling = () => {
        if (this.props.reverseScroll) {
            this.setState({ animValues: newAnimationValueNegative })
        }
            this.setState({ animValues: newAnimationValue })
      }

      scrolling()
  }
  _resetMin () { this.setState({ animValues: 0 }) }
  _resetMax (x) { this.setState({ animValues: x }) }
  render () {
    const { width, height, config } = this.props
    const springConfig = config ? config : presets.noWobble
    const styles = {
       height: width ? width : `100%`,
       width: width ? width : `100%`,
       overflow: `hidden`,
       position: `relative`
    }
    return(
      <div
        onWheel={this._onScrollStart}
        ref='hscrollContainer'
        style={styles}
        {...this.props}
        >
        <Motion
          style={{ z: spring(this.state.animValues, springConfig)
          }}>
          {({z}) => {
            const scrollingElementStyles = {
              transform: `translate3d(${z}px, 0,0)`,
              display: `inline-flex`,
              height: `100%`,
              position: `absolute`
            }
            return (
              <div style={scrollingElementStyles} >
                { this.props.children }
              </div>
            )
          }}
        </Motion>
      </div>
     )
   }
}

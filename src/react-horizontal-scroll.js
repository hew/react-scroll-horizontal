import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

export default class HorizontalScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDeltas: 0,  // Gathered from mousewheel
      animValues: 0      // Fed to React Motion
    }
  }
  componentDidMount() {
    // Place the 'lock__' class on the HTML element - if toggled
    if (this.props.pageLock) {
      const orig = document.firstElementChild.className;
      document.firstElementChild.className = orig + (orig ? ' ' : '') + 'locked__';
    }
  }
  componentWillUnmount() {
    // Always remove it when unmounting
    document.firstElementChild.className =
    document.firstElementChild.className.replace(/ ?locked__/, '');
  }
  componentDidUpdate (nextProps, nextState) {
    /*
      CDU in this case basically just watches to make sure the
      animation values/scroll distance is kept between the bounds
      of the child and the parent of <HorizontalScroll>
     */
    const curr = this.state.animValues
    const max = this.refs.scrollContainer.lastElementChild.scrollWidth
    const win = this.refs.scrollContainer.offsetWidth
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
      // Normalize the mouse deltas across devices
      const deltaY = Math.max(-1, Math.min(1, (e.deltaY || -e.detail)))
      // Speed up things a bit
      const mouseY = deltaY * 100
      // Bring in the existing animation values
      const animationValue  = this.state.animValues
      // Adds the reverse toggle for the component
      const mouseYReverse   = -(mouseY)
      // Calculate the new animation value(s)
      const newAnimationValue          = animationValue + mouseY
      const newAnimationValueNegative  = animationValue + mouseYReverse
      if (this.props.reverseScroll) {
        this.setState({ animValues: newAnimationValue })
      }
        this.setState({ animValues: newAnimationValueNegative })
  }
  _resetMin = () => { this.setState({ animValues: 0 }) }
  _resetMax = (x) => { this.setState({ animValues: x }) }
  render() {
    const { width, height } = this.props
    const styles = {
       height: width ? width : `100%`,
       width: width ? width : `100%`,
       overflow: `hidden`,
       position: `relative`
    }
    return(
      <div
        onWheel ={this._onScrollStart}
        ref='scrollContainer'
        className='scroll-container'
        style={styles}
        {...this.props}
        >
        <Motion
          style={{ z: spring(this.state.animValues, presets.noWobble)
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

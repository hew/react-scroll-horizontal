import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DOM from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

export default class HorizontalScroll extends Component {
  constructor(props) {
    super(props)

    this.state = { animValues: 0 }

    this.onScrollStart = this.onScrollStart.bind(this)
    this.resetMin      = this.resetMin.bind(this)
    this.resetMax      = this.resetMax.bind(this)
  }

  componentDidMount() {
    // Place the 'lock__' class on the HTML element - if toggled
    if (this.props.pageLock) {
      const orig = document.firstElementChild.className
      document.firstElementChild.className = orig + (orig ? ' ' : '') + 'locked__'
    } else return
  }

  componentWillUnmount() {
    if (this.props.pageLock) {
    document.firstElementChild.className =
    document.firstElementChild.className.replace(/ ?locked__/, '')
    } else return
  }

  componentDidUpdate = () => this.calculate()

  onScrollStart(e) {
    e.preventDefault()
    // If scrolling on x axis, change to y axis
    // Otherwise just get the y deltas
    // Basically, this for Apple mice that allow
    // horizontal scrolling by default
    var rawData = e.deltaY ? e.deltaY : e.deltaX
    var mouseY = Math.floor(rawData)

    // Bring in the existing animation values
    var animationValue            = this.state.animValues
    var newAnimationValue         = (animationValue + mouseY)
    var newAnimationValueNegative = (animationValue - mouseY)

    if (!this.caniscroll()) {
      return
    }

    var scrolling = () => {
      this.props.reverseScroll
        ?  this.setState({ animValues: newAnimationValueNegative })
        :  this.setState({ animValues: newAnimationValue })
    }

    // Begin Scrolling Animation
    requestAnimationFrame(scrolling)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (true
      // Ensure componet has been loaded
      && this.calculate.timer !== void 0
      && this.props.children === nextProps.children
      && this.state.animValues === nextState.animValues) {
      return false
    }
    
    if (true 
      && this.props.children === nextProps.children
      && this.caniscroll() === false) {
      return false
    }

    return true
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      // Reset container offset
      this.resetMin()
    }
  }

  caniscroll() {
    let el = DOM.findDOMNode(this.hScrollParent)
    let rect = el.getBoundingClientRect()
    let scroller = el.firstElementChild

    return scroller.offsetLeft < rect.left 
      || (scroller.offsetLeft + scroller.offsetWidth > rect.width)
  }

  calculate() {
    // Cancel the previous calculate
    clearTimeout(this.calculate.timer)

    // Lazy to calculate, prevent max recurse call
    this.calculate.timer = setTimeout(() => {

      // Calculate the bounds of the scroll area
      let el = DOM.findDOMNode(this.hScrollParent)

      let max = el.lastElementChild.scrollWidth
      let win = el.offsetWidth

      // Get the new animation values
      var curr = this.state.animValues

      // Establish the bounds. We do this every time b/c it might change.
      var bounds = -(max - win)

      // Logic to hold everything in place
      if (curr >= 1) {
        this.resetMin()
      } else if (curr <= bounds) {
        var x = bounds + 1
        this.resetMax(x)
      }
    })
  }

  resetMin() { this.setState({ animValues: 0 }) }

  resetMax(x) { this.setState({ animValues: x }) }

  render() {

    const { config, style } = this.props
    const { width, height } = style
    const springConfig = config ? config : presets.noWobble

    // Styles
    const styles = {
      height: height ? height : `100%`,
      width: width ? width : `100%`,
      overflow: `hidden`,
      position: `relative`,
      ...styles
    }

    return (
      <div
        onWheel={ this.onScrollStart }
        ref={ r => { this.hScrollParent = r }}
        style={ styles }
        className={`scroll-horizontal ${this.props.className || ''}`}
      >
        <Motion style={ { z: spring(this.state.animValues, springConfig) } }>
          { ({z}) => {
              const scrollingElementStyles = {
                transform: `translate3d(${z}px, 0,0)`,
                display: `inline-flex`,
                height: `100%`,
                position: `absolute`,
                willChange:`transform`
              }

              return (
                <div style={ scrollingElementStyles }>
                  { this.props.children }
                </div>
              )
            } }
        </Motion>
      </div>
    )
  }
}

HorizontalScroll.proptypes = {
  reverseScroll: PropTypes.bool,
  pageLock: PropTypes.bool,
  config: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
}

HorizontalScroll.defaultProps = {
  reverseScroll: false,
  pageLock: false,
  config: null,
  style: { width: `100%`, height: `100%` },
  className: null,
}

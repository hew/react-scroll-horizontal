
// <I>think it's the mouse. React seems to optimize everything that we've tried.</I>





import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

function normalize_mousewheel(e) {
    var //o = e.originalEvent,
        o = e,
        d = o.detail, w = o.wheelDelta,
        n = 225, n1 = n-1;

    // Normalize delta
    d = d ? w && (f = w/d) ? d/f : -d/1.35 : w/120;
    // Quadratic scale if |d| > 1
    d = d < 1 ? d < -1 ? (-Math.pow(d, 2) - n1) / n : d : (Math.pow(d, 2) + n1) / n;
    // Delta *should* not be greater than 2...
    e.delta = Math.min(Math.max(d / 2, -1), 1);
}



// function normalizeWheelDelta(event) {
//     let scrolling = {
// 			last: 0,
// 			delta: 0,
// 			resetTime: 100
// 		};
// 		scrolling.curDelta = (event.deltaY -event.wheelDelta);
// 		scrolling.curDelta /= event.deltaMode === 1 ? 3 : 100;
// 		const time = +new Date();
// 		if (scrolling.last < time - scrolling.resetTime) {
// 			scrolling.delta = 0;
// 		}
// 		scrolling.last = time;
// 		scrolling.delta += scrolling.curDelta;
// 		if (Math.abs(scrolling.delta) < 1) {
// 			scrolling.finalDelta = 0;
// 		} else {
// 			scrolling.finalDelta = Math.round(scrolling.delta / 1);
// 			scrolling.delta %= 1;
// 		}
// 		const theValues = scrolling.finalDelta;
//     return theValues
// 		}
//
//


//
// function normalize_mousewheel(event) {
//       const resetTime = 0.3
// 			// wheelDelta needed only for IE8-
// 			const curDelta = event.deltaY - event.wheelDelta;
//       const time = +new Date();
//
// 			if (last < time - resetTime) {
// 				delta = 0;
// 			}
// 			if (abs(scrolling.delta) < 1) {
// 				scrolling.finalDelta = 0;
// 			} else {
// 				finalDelta = round(delta / 1);
// 				delta %= 1;
// 			}
// 			return finalDelta;
// 		}
//

function MouseWheelHandler(e) {

		return false;
	}




export default class HorizontalScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animValues: 0,
      currentDeltas: 0
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

    //  CDU in this case basically just watches to make sure the
    //  animation values/scroll distance is kept between the bounds
    //  of the
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
    console.log(this.state.currentDeltas)
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

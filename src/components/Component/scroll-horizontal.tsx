import {MutableRefObject, Ref, useEffect, useState} from 'react'

interface ScrollProps {
  parentRef: Ref<HTMLDivElement>
  onEnd: () => void
  onStart: () => void
}

interface ScrollData {
  animationValues: number
}

const scrollHorizontal = ({parentRef, onStart, onEnd}: ScrollProps): ScrollData => {
  const [animationValues, setAnimationValues] = useState(0)

  const onScrollStart = (e: WheelEvent) => {
    const rawData = e.deltaY ? e.deltaY : e.deltaX
    const mouseY = Math.floor(rawData)

    setAnimationValues(prevState => {
      const newState = prevState + mouseY
      const el = (parentRef as MutableRefObject<HTMLDivElement>).current 
      const childScrollWidth = [...el?.children].reduce((acc, each) => {
        return acc + each.scrollWidth
      }, 0)
      const win = el?.offsetWidth
      const bounds = -(childScrollWidth - win)

      if (newState <= bounds) {
        if (onEnd && typeof onEnd === 'function') {
          onEnd()
          return bounds + 600
        }
        return bounds
      } else if (newState > 0) {
        onStart()
        return 0
      } else {
        return newState
      }
    })
  }

  useEffect(() => {
    const el = (parentRef as React.MutableRefObject<HTMLDivElement>).current
    const childNodes = el?.children

    // Check if there is at least one child node, and that it's wider than our parent element
    if (childNodes.length > 1) {
      const totalWidth = [...childNodes].reduce((acc, each) => {
        return acc + each.scrollWidth
      }, 0)

      if (totalWidth) {
        if (totalWidth < el.scrollWidth) {
          throw new Error(
            'The total width of the child nodes is less than the width of the parent',
          )
        }
      }
    } else {
      const child = el.lastElementChild
      if (child) {
        if (child.scrollWidth < el.offsetWidth) {
          throw new Error('The width of the child node is smaller than the parent')
        }
      } else {
        throw new Error('You must pass in at least one child node')
      }
    }

    // Add our event listeners
    window.addEventListener('wheel', onScrollStart)

    // unsubscribe when we unmount
    return () => {
      window.removeEventListener('wheel', onScrollStart)
    }
  }, [])

  return {
    animationValues,
  }
}

export default scrollHorizontal

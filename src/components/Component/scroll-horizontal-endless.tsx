import {FC, Ref, useEffect, useRef, useState} from 'react'

interface ScrollProps {
  parentRef: Ref<HTMLDivElement>
  onReachEnd: () => void
  onRearchStart: () => void
}

interface ScrollData {
  animationValues: number
}

const scrollHorizontalEndless = ({parentRef}: ScrollProps): ScrollData => {
  const [animationValues, setAnimationValues] = useState(0)

  const onScrollStart = e => {
    // If scrolling on x axis, change to y axis. Otherwise, just get the y deltas.
    // (Basically, this for Apple mice that allow horizontal scrolling by default)
    const rawData = e.deltaY ? e.deltaY : e.deltaX
    const mouseY = Math.floor(rawData)

    setAnimationValues(prevState => {
      console.log(prevState, '(onScrollStart) animationValues')
      console.log(mouseY, '(onScrollStart) mouseY')

      const newState = prevState + mouseY
      const el = parentRef.current

      console.log(el, "el")
      console.log(el.lastElementChild.scrollWidth, "scroll width")
      console.log(el.childNodes, "child nodes")

      // const rect = el?.getBoundingClientRect()
      // const max = el?.lastElementChild.scrollWidth
      // const win = el?.offsetWidth
      // const bounds = -(max - win)

      // console.log(rect, 'react')
      // console.log(max, 'max')
      // console.log(win, 'win')
      // console.log(bounds, 'bounds')

      // if (newState === prevState) {
      //   return prevState
      // }
      // if (newState <= 0) {
      //   return 0
      // }
      // if (newState <= bounds) {
      //   if (max > rect.width) {
      //     return bounds + 1
      //   } else {
      //     return 0
      //   }
      // }

      // return prevState + mouseY
    })
  }


  useEffect(() => {
    window.addEventListener('wheel', onScrollStart)
    return () => {
      window.removeEventListener('wheel', onScrollStart)
    }
  }, [])

  return {
    animationValues,
  }
}

export default scrollHorizontalEndless

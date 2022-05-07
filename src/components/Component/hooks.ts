import {MutableRefObject, Ref, useEffect, useState} from 'react'

interface ScrollData {
  animationValues: number
  setAnimationValues: (v: number) => void
}

const defaultConfig = {reversed: false}

export const useGetScrollAnimationValues = ({
  reversed,
}: {reversed?: boolean} = defaultConfig): ScrollData => {
  const [animationValues, setAnimationValues] = useState(0)

  useEffect(() => {
    window.addEventListener('wheel', onScrollStart)

    return () => {
      window.removeEventListener('wheel', onScrollStart)
    }
  }, [])

  const onScrollStart = (e: WheelEvent) => {
    const rawData = e.deltaY ? e.deltaY : e.deltaX
    const mouseY = Math.floor(rawData)

    setAnimationValues(prev => {
      const delta = reversed ? prev - mouseY : prev + mouseY

      if (delta === animationValues) false

      return delta
    })
  }

  return {
    animationValues,
    setAnimationValues,
  }
}

export const useLayoutChecks = ({parentRef}: {parentRef: Ref<HTMLDivElement>}) => {
  const pref = parentRef as MutableRefObject<HTMLDivElement>

  if (!pref) {
    throw new Error('Ref is not defined')
  }

  const [isReadyToGo, setIsReadyToGo] = useState(false)

  useEffect(() => {
    const ref = parentRef as React.MutableRefObject<HTMLDivElement>
    const el = ref?.current

    if (!el) {
      return setIsReadyToGo(false)
    }

    const childNodes = el?.children

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
    setIsReadyToGo(true)
  }, [])

  return isReadyToGo
}

interface ScrollProps {
  parentRef: Ref<HTMLDivElement>
  onEnd: () => void
  onStart: () => void
  isEndless?: boolean
}

const useScrollHorizontal = ({
  parentRef,
  onStart,
  onEnd,
  isEndless,
}: ScrollProps): ScrollData => {
  const pref = parentRef as MutableRefObject<HTMLDivElement>
  const {animationValues: v, setAnimationValues} = useGetScrollAnimationValues()

  // start out checks
  const isReadyToGo = useLayoutChecks({parentRef: pref})
  if (!isReadyToGo) {
    return {animationValues: 0, setAnimationValues}
  }

  // start out logic
  const el = pref.current
  const parentWidth = el?.offsetWidth
  const scrollWidth = [...el?.children].reduce((acc, each) => {
    return acc + each.scrollWidth
  }, 0)
  const childWidth = scrollWidth / el?.children.length
  const bounds = -(scrollWidth - parentWidth)

  if (isEndless) {
    /*
                ------------------------------------------------
       [item 0] | [item 1] [item 2] [item 3] [item 4] [item 5] | :item 0:
                ------------------------------------------------

                ------------------------------------------------
       [item 1] | [item 2] [item 3] [item 4] [item 5] [item 0] | :item 1:
                ------------------------------------------------
    */
    if (v < bounds) {
      onEnd()
      setAnimationValues(bounds + childWidth)
    } else if (v > 0) {
      onStart()
      setAnimationValues(-childWidth)
    }
  } else {
    /*
     ------------------------------------------------------------------------
     |<--- |item 0| | |item 1| |item 2| |item 3| |item 4| |item 5| -------->|
     ------------------------------------------------------------------------
  */
    if (v < bounds) {
      if (onEnd && typeof onEnd === 'function') {
        onEnd()
      }
      setAnimationValues(bounds)
    } else if (v > 0) {
      if (onStart && typeof onStart === 'function') {
        onStart()
      }
      setAnimationValues(0)
    }
  }

  return {animationValues: v, setAnimationValues}
}

export default useScrollHorizontal

import {FC, useRef, useState} from 'react'
import useScrollHorizontal from './hooks'

interface ComponentProps {
  name: string
}

const Component: FC<ComponentProps> = ({}) => {
  const width = 600
  const parentRef = useRef<HTMLDivElement>(null)

  const [children, setChildren] = useState([
    {name: 'beep', image: 'beep'},
    {name: 'boop', image: 'boop'},
    {name: 'bop', image: 'bop'},
    {name: 'zap', image: 'blap'},
    {name: 'brrr', image: 'brr'},
    {name: 'xxx', image: 'xxx'},
    {name: 'sss', image: 'ss'},
  ])

  const onStart = () => {
    setChildren(prev => {
      let last = prev.pop()
      return [last, ...prev]
    })
  }
  const onEnd = () => {
    setChildren(prev => {
      let first = prev.shift()
      return [...prev, first]
    })
  }

  const {animationValues} = useScrollHorizontal({
    parentRef,
    onStart,
    onEnd,
    isEndless: true
  })

  const scrollingElementStyles = offset => ({
    transform: `translate3d(${animationValues + offset}px, 0,0)`,
    display: `inline-flex`,
    position: 'absolute' as 'absolute',
    willChange: `transform`,
    width: `${width}px`,
    height: '40px',
    backgroundColor: 'brown',
    outline: '1px solid black',
  })

  const parentStyles = {
    width: '100%',
    overflow: 'hidden',
    height: '40px',
    backgroundColor: 'yellow',
    position: 'relative' as 'relative',
    display: 'flex',
  }

  console.log(parentRef, "parentRef")
  return (
    <div>
      <div style={parentStyles} ref={parentRef}>
        {children.map((each, idx) => (
          <div key={idx} style={scrollingElementStyles(idx * width)}>
            {each.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Component

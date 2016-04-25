# React Horizontal Scroll

A React component for scrolling horizontally with the **mousewheel.**


## About

Feed `<HorizontalScroll>` one component, or many components. <br />
It will automagically take care of the rest.

## Usage

```bash
npm i react-horizontal-scroll
```

```jsx
  <HorizontalScroll
      pageLock      = { true || false }
      reverseScroll = { true || false }
      >
      { children }
  </HorizontalScroll>

```

### Arbitrary Parent/Child Widths
```jsx
import React, { Component } from 'react'
import HorizontalScroll from 'react-horizontal-scroll'

class ScrollingHorizontally extends Component {
  render() {
    const child   = { width: `300%`, height: `100%`}
    return (
      <div style={parent}>
        <HorizontalScroll
            pageLock      = { true || false }
            reverseScroll = { true || false }
            >
            <div style={child} />
            <div style={child} />
            <div style={child} />
        </HorizontalScroll>

      </div>
    )
  }
}
```
### Full Width/Body Container
```js
import React, { Component } from 'react'
import HorizontalScroll from 'react-horizontal-scroll'

class ScrollingHorizontally extends Component {
  render() {
    const child   = { width: `33em`, height: `100%`}
    return (
        <HorizontalScroll pageLock={ true || false }>
            <div style={child} />
            <div style={child} />
            <div style={child} />
        </HorizontalScroll>
    )
  }
}
```


## Background

I set out to make this component with an idea that you should be able to use React's
state system to efficiently handle `mouseWheel` events in conjunction with some kind of
animation library. That is, to move a div back and forth as the user scrolls.

## Performance

Pretty good. Because it's almost entirely React and React Motion handling all
the heavy lifting here, my tests so far have been seen only a few dips below 60ps.
How does this library perform under scale? Probably pretty poorly. It was developed
with a smaller website in mind.

## Contributing

Yes, please!




MIT License

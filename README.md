# React Horizontal Scroll

A React component for scrolling horizontally with the **mousewheel.**


## About

Feed `<HorizontalScroll>` one component, or many components. <br />
It will automagically take care of the rest.

## Usage

```bash
npm i react-horizontal-scroll
```

```js
import React, { Component } from 'react'
import HorizontalScroll from 'react-horizontal-scroll'

class ScrollingHorizontally extends Component {
  render() {
    const style = { width: `30em`, height: `100%`}
    return (
      <div>
        <HorizontalScroll
          pageLock={ true || false  }
          reverseScroll={ true || false }
        >
          <div style={style} />
          <div style={style} />
          <div style={style} />
          <div style={style} />
          <div style={style} />
        </HorizontalScroll>
      </div>
    )
  }
}


```

## Performance

I have yet to do any performance audits, and since the Grid component listens to window resize events,
this probably has some performance issues. Any help in that area would be greatly appreciated.

MIT License

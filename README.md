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


## Overview

I set out to make this component with an idea that you should be able to use React's
state system to efficiently handle `mouseWheel` events in conjunction with some kind of
animation library. That is, to move a div back and forth as the user scrolls.

As it stands now, the basic idea has been implemented, but I am in a situation where
certain mice are giving


```


MIT License

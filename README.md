# React Scroll Horizontal

A React component for scrolling horizontally with the mouse wheel.

## Demo 

[http://hew.github.io/react-scroll-horizontal](http://hew.github.io/react-scroll-horizontal)

## How it Works

Feed `<HorizontalScroll>` one child, or many children.
So long as they have a static width, this component will
take care of the rest.

---

**Note**: This component is in a **beta**.
I haven't explored all the animation options, and Firefox is giving slightly different deltas for some of the mice that I have
tested. See that issue [here](https://github.com/hew/react-horizontal-scroll/issues/1).

___

## Usage

```bash
npm i react-scroll-horizontal
```

```jsx
  <HorizontalScroll
      pageLock      = { bool }
      reverseScroll = { bool }
      style         = { object }
      config        = {{ stiffness: int, damping: int }}
      >
      { children }
  </HorizontalScroll>

```

Props

* `pageLock`       - Adds a `lock__` class to the HTML body
* `reverseScroll`  - Reverses the scroll direction
* `style`          - Passes a spring config object to React Motion
* `config`         - Passes a spring config object to React Motion


Gotchas

* Uses Flexbox
* Child item(s) must be px/em/vw - no percentages (yet)


### Arbitrary Parent/Child Widths Example
```jsx
import React, { Component } from 'react'
import HorizontalScroll from 'react-horizontal-scroll'

class ScrollingHorizontally extends Component {
  render() {
    const child   = { width: `30em`, height: `100%`}
    const parent  = { width: `60em`, height: `100%`}
    return (
      <div style={parent}>
        <HorizontalScroll>
            <div style={child} />
            <div style={child} />
            <div style={child} />
        </HorizontalScroll>
      </div>
    )
  }
}
```
### Full Width Example
```js
import React, { Component } from 'react'
import HorizontalScroll from 'react-horizontal-scroll'

class ScrollingHorizontally extends Component {
  render() {
    const child = { width: `300em`, height: `100%`}
    return (
      <body>
        <HorizontalScroll>
          <div style={child} />
        </HorizontalScroll>
      </body>

    )
  }
}
```


## Contributing

Yes, please!


---
MIT License

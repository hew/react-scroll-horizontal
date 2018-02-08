# React Scroll Horizontal

[WIP] A React component for scrolling horizontally with the mouse wheel.

## Demo 

[http://hew.github.io/react-scroll-horizontal](http://hew.github.io/react-scroll-horizontal)

## How it Works

Feed `<HorizontalScroll>` one child, or many children.
So long as they have a static width, this component will
take care of the rest. **Note: the width of the children must
be greater than the width of the `<HorizontalScroll>`**

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
    className     = { string }
    >
     { children }
  </HorizontalScroll>

```

Props

* `pageLock`       - Adds a `lock__` class to the HTML body
* `reverseScroll`  - Reverses the scroll direction
* `style`          - Pass a style object through to parent div
* `config`         - Passes a spring config object to React Motion
* `className`      - Classnames to pass into the component


Gotchas

* Child item(s) must be px/em/vw - no percentages (yet)
* Flexbox weirdness in IE


### Arbitrary Parent/Child Widths Example
```jsx
import React, { Component } from 'react'
import HorizontalScroll from 'react-scroll-horizontal'

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
import HorizontalScroll from 'react-scroll-horizontal'

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

## Sites/Apps using React Scroll Horizontal

[ieaseMusic](https://github.com/trazyn/ieaseMusic)

## Contributing

Yes, please!


---
MIT License

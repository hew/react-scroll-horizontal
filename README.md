# Rgx

React grid system – constraint-based responsive grid with no CSS and no media queries.

[![Build Status](https://travis-ci.org/jxnblk/rgx.svg?branch=master)](https://travis-ci.org/jxnblk/rgx)

## About

Rgx is an experimental, responsive grid system based on <b>minimum and maximum widths</b> and designed for content-out layout.
Rgx is built purely in React and uses inline styles, with no CSS and no media queries.
Each Grid row sets its child Cells to display inline block once the Grid is wide enough to fit all Cells’ minimum widths.
Once set inline, each Cell’s width is based on the ratio of its own minimum width to the sum of minimum widths per row.
Once a Cell hits its max-width, the remaining space is distributed to other Cells in the row.
Since this isn’t based on viewport-based media queries, the Grid responds to its own width, similar to element queries.

## Getting Started

```bash
npm i rgx
```

```js
import React from 'react'
import { Grid, Cell } from 'rgx'

class Demo extends React.Component {
  render () {
    return (
      <Grid gutter={8}>
        <Cell min={256} max={320}>Min 256 Max 320</Cell>
        <Cell min={768}>Min 768</Cell>
      </Grid>
    )
  }
}

React.render(<Demo />, document.querySelector('#demo'))
```

## Grid Component

#### Props
- `gutter` - pixel value to set negative margins on the Grid component and padding on Cell components to create gutters.
- `min` - pixel value to set a default `min` prop for child Cells

## Cell Component

#### Props
- `min` - pixel value to set the min-width at which a Cell is displayed inline.
- `max` - pixel value at which the Cell should not expand. Remaining space is distributed to other Cells.
- `padding` - sets left and right padding. This is used by the Grid component when the `gutter` prop is set and the Cell has no padding set.
- `width` - fraction value used by the Grid component to set a width. This can also be set manually when used independently from the Grid component
- `inline` - boolean value used by the Grid component to display a Cell inline.

## Performance

I have yet to do any performance audits, and since the Grid component listens to window resize events,
this probably has some performance issues. Any help in that area would be greatly appreciated.

MIT License


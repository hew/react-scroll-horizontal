import {render, screen} from "@testing-library/react"

import Component from "./Component"

test("renders", () => {
    render(<Component name="Brad Garropy" />)
    expect(screen.getByText("Brad Garropy"))
})

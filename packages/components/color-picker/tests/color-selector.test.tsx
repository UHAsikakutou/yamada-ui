import { fireEvent, render, screen, waitFor } from "@yamada-ui/test"
import { expect } from "vitest"
import { ColorSelector } from "../src"
import { resetEyeDropperMock, mockEyeDropper } from "./utils/mock-eye-dropper"

describe("<ColorSelector />", () => {
  test("ColorSelector renders correctly", async () => {
    render(<ColorSelector data-testid="ColorSelector" />)

    const colorSelector = screen.getByTestId("ColorSelector")

    expect(colorSelector).toBeInTheDocument()
  })

  test("ColorSelector with eye dropper", () => {
    mockEyeDropper()

    render(<ColorSelector data-testid="ColorSelector" withEyeDropper />)

    const buttons = screen.getAllByRole("button")

    const eyeDropperButton = buttons[0]
    expect(eyeDropperButton.getAttribute("aria-label")).toBe("Pick a color")

    resetEyeDropperMock()
  })

  test("ColorSelector swatch click behavior", async () => {
    const mockOnChange = vi.fn()
    const mockOnChangeEnd = vi.fn()
    const mockOnSwatchClick = vi.fn()

    render(
      <ColorSelector
        data-testid="ColorSelector"
        swatchesProps={{
          swatches: ["#2e2e2e", "#868e96", "invalid-color"],
        }}
        onChange={mockOnChange}
        onChangeEnd={mockOnChangeEnd}
        onSwatchClick={mockOnSwatchClick}
      />,
    )

    const swatchButtons = screen.getAllByRole("button", {
      name: /^Select .* as the color$/,
    })

    fireEvent.click(swatchButtons[0])
    expect(mockOnSwatchClick).toHaveBeenCalledWith("#2e2e2e")
    expect(mockOnChange).toHaveBeenCalledWith("#2e2e2e")
    expect(mockOnChangeEnd).toHaveBeenCalledWith("#2e2e2e")

    mockOnSwatchClick.mockClear()
    mockOnChange.mockClear()
    mockOnChangeEnd.mockClear()

    fireEvent.click(swatchButtons[2])
    expect(mockOnSwatchClick).toHaveBeenCalledWith("invalid-color")
    expect(mockOnChange).toHaveBeenCalledWith("#ffffff")
    expect(mockOnChangeEnd).not.toHaveBeenCalled()
  })

  test("ColorSelector hook updates color value and calls onChange", () => {
    const mockOnChange = vi.fn()
    render(<ColorSelector onChange={mockOnChange} />)

    const inputs = screen.getAllByRole("spinbutton")

    const inputR = inputs[0]
    const inputG = inputs[1]
    const inputB = inputs[2]

    fireEvent.change(inputR, { target: { value: "128" } })
    fireEvent.change(inputG, { target: { value: "64" } })
    fireEvent.change(inputB, { target: { value: "32" } })

    expect(mockOnChange).toHaveBeenCalledWith("#804020")
  })

  test("ColorSelector should apply HSLA color value correctly", () => {
    const initialValue = "hsla(240, 100%, 50%, 0.5)"

    render(<ColorSelector defaultValue={initialValue} />)

    screen.getByDisplayValue("hsla(240, 100%, 50%, 0.5)")
  })

  test("ColorSelector includes alpha channel when format is rgba", () => {
    render(<ColorSelector defaultValue="rgba(128, 64, 32, 0.5)" />)

    const inputs = screen.getAllByRole("spinbutton")
    expect(inputs).toHaveLength(4)

    const alphaInput = inputs[3]
    expect(alphaInput).toHaveValue(50)
  })

  test("ColorSelector handles HSL color changes correctly", () => {
    const mockOnChange = vi.fn()
    render(
      <ColorSelector
        onChange={mockOnChange}
        defaultValue="hsl(120, 100%, 50%)"
      />,
    )

    const inputs = screen.getAllByRole("spinbutton")
    const hueInput = inputs[0]
    const saturationInput = inputs[1]
    const lightnessInput = inputs[2]

    fireEvent.change(hueInput, { target: { value: "180" } })
    fireEvent.change(saturationInput, { target: { value: "50" } })
    fireEvent.change(lightnessInput, { target: { value: "25" } })

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.stringMatching(/^hsl\(180, 50%, 25%\)$/),
    )
  })
})

describe("ColorSelector format changes", () => {
  test("Changing format updates color value", async () => {
    const { rerender } = render(
      <ColorSelector defaultValue="#ff0000" format="hex" />,
    )

    const hiddenInput = screen.getByDisplayValue("#ff0000")
    expect(hiddenInput).toBeInTheDocument()

    rerender(<ColorSelector defaultValue="#ff0000" format="rgb" />)

    await waitFor(() => {
      const updatedInput = screen.getByDisplayValue("rgb(255, 0, 0)")
      expect(updatedInput).toBeInTheDocument()
    })
  })

  test("Changing format to rgba adds alpha channel", async () => {
    const { rerender } = render(
      <ColorSelector defaultValue="#ff0000" format="hex" />,
    )

    rerender(<ColorSelector defaultValue="#ff0000" format="rgba" />)

    await waitFor(() => {
      const updatedInput = screen.getByDisplayValue("rgba(255, 0, 0, 1)")
      expect(updatedInput).toBeInTheDocument()
    })
  })

  test("Changing format doesn't update when value is falsy", async () => {
    const { rerender } = render(<ColorSelector format="hex" />)

    const initialInput = screen.getByDisplayValue("#ffffff")
    expect(initialInput).toBeInTheDocument()

    rerender(<ColorSelector format="rgb" />)

    await waitFor(() => {
      const unchangedInput = screen.getByDisplayValue("#ffffff")
      expect(unchangedInput).toBeInTheDocument()
    })
  })
})

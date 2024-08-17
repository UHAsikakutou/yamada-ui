import { render, screen, fireEvent, waitFor, act } from "@yamada-ui/test"
import { ColorPicker } from "../src"
import { mockEyeDropper, resetEyeDropperMock } from "./utils/mock-eye-dropper"

vi.mock("@yamada-ui/use-eye-dropper", () => ({
  useEyeDropper: () => ({
    supported: true,
    onOpen: vi.fn().mockResolvedValue({ sRGBHex: "#00ff00" }),
  }),
}))

describe("<ColorPicker />", () => {
  test("ColorPicker renders correctly", async () => {
    render(<ColorPicker data-testid="colorPicker" />)

    const colorPicker = screen.getByTestId("colorPicker")

    expect(colorPicker).toBeInTheDocument()
  })

  test("ColorPicker changes color on selecting a new color", () => {
    render(<ColorPicker data-testid="colorPicker" />)

    const colorPicker = screen.getByTestId("colorPicker")
    const value = "#ff0000"

    fireEvent.change(colorPicker, { target: { value } })

    expect(colorPicker).toHaveValue(value)
  })

  test("ColorPicker renders with the correct initial value", () => {
    render(<ColorPicker defaultValue="#00ff00" data-testid="colorPicker" />)

    const colorPicker = screen.getByTestId("colorPicker")

    expect(colorPicker).toHaveValue("#00ff00")
  })

  test("ColorPicker renders with eye dropper", () => {
    mockEyeDropper()

    render(
      <ColorPicker
        defaultValue="#00ff00"
        data-testid="colorPicker"
        withEyeDropper
      />,
    )

    const colorPicker = screen.getByTestId("colorPicker")

    expect(colorPicker).toHaveValue("#00ff00")

    resetEyeDropperMock()
  })

  test("ColorPicker renders as disabled", () => {
    render(<ColorPicker disabled />)

    const colorPicker = screen.getByRole("textbox")

    expect(colorPicker).toBeDisabled()
  })

  test("ColorSelector renders initially when isOpen is specified for ColorPicker", () => {
    const { container } = render(<ColorPicker isOpen />)

    const popover = container.querySelector(".ui-popover")

    expect(popover).toBeVisible()
  })

  test("ColorSelector does not render initially when isOpen is not specified for ColorPicker", () => {
    const { container } = render(<ColorPicker />)

    const popover = container.querySelector(".ui-popover")

    expect(popover).not.toBeVisible()
  })

  test("ColorPickerEyeDropper clones children with correct props", () => {
    interface CustomIconProps {
      focusable?: boolean | "true" | "false"
      "aria-hidden"?: boolean | "true" | "false"
      style?: React.CSSProperties
    }

    const CustomIcon: React.FC<CustomIconProps> = ({
      focusable,
      "aria-hidden": ariaHidden,
      style,
    }) => (
      <svg
        data-testid="custom-icon"
        focusable={focusable}
        aria-hidden={ariaHidden}
        style={style}
      >
        <path d="M0 0h24v24H0z" />
      </svg>
    )

    render(
      <ColorPicker
        data-testid="colorPicker"
        withEyeDropper
        eyeDropperProps={
          {
            children: <CustomIcon />,
            "data-testid": "eye-dropper",
          } as any
        }
      />,
    )

    const eyeDropper = screen.getByTestId("eye-dropper")
    expect(eyeDropper).toBeInTheDocument()

    const customIcon = screen.getByTestId("custom-icon")
    expect(customIcon).toBeInTheDocument()
    expect(customIcon).toHaveAttribute("focusable", "false")
    expect(customIcon).toHaveAttribute("aria-hidden", "true")
    expect(customIcon).toHaveStyle({
      maxWidth: "1em",
      maxHeight: "1em",
      color: "currentColor",
    })
  })

  test("ColorPicker calls onOpen when input is focused", async () => {
    const onOpenMock = vi.fn()
    render(<ColorPicker data-testid="colorPicker" onOpen={onOpenMock} />)

    const colorPicker = screen.getByTestId("colorPicker")

    await act(async () => {
      fireEvent.focus(colorPicker)
    })

    await waitFor(() => {
      expect(onOpenMock).toHaveBeenCalledTimes(1)
    })
  })

  test("ColorPicker does not call onOpen when disabled", async () => {
    const onOpenMock = vi.fn()
    render(
      <ColorPicker data-testid="colorPicker" onOpen={onOpenMock} disabled />,
    )

    const colorPicker = screen.getByTestId("colorPicker")

    await act(async () => {
      fireEvent.focus(colorPicker)
    })

    await waitFor(() => {
      expect(onOpenMock).not.toHaveBeenCalled()
    })
  })

  test("ColorPicker opens popover when input is focused", async () => {
    const { container } = render(<ColorPicker data-testid="colorPicker" />)

    const colorPicker = screen.getByTestId("colorPicker")

    await act(async () => {
      fireEvent.focus(colorPicker)
    })

    await waitFor(() => {
      const popover = container.querySelector(".ui-popover")
      expect(popover).toBeVisible()
    })
  })

  test("ColorPicker calls onClose and closes popover when Escape is pressed", async () => {
    const onCloseMock = vi.fn()
    const { container } = render(
      <ColorPicker
        data-testid="colorPicker"
        onClose={onCloseMock}
        isOpen
        closeOnEsc
      />,
    )

    const colorPicker = screen.getByTestId("colorPicker")
    const popover = container.querySelector(".ui-popover")

    expect(popover).toBeVisible()

    await act(async () => {
      fireEvent.keyDown(colorPicker, { key: "Escape", code: "Escape" })
    })

    await waitFor(
      () => {
        expect(onCloseMock).toHaveBeenCalledTimes(1)
      },
      { timeout: 1000 },
    )

    await waitFor(
      () => {
        const popoverContent = container.querySelector(".ui-popover__content")
        expect(popoverContent).toHaveStyle("visibility: hidden")
      },
      { timeout: 1000 },
    )
  })

  test("ColorPicker updates value when closed", async () => {
    const onChange = vi.fn()
    const { container } = render(
      <ColorPicker
        data-testid="colorPicker"
        defaultValue="#ff0000"
        onChange={onChange}
        isOpen
        closeOnEsc
      />,
    )

    const colorPicker = screen.getByTestId("colorPicker")
    const popover = container.querySelector(".ui-popover")

    expect(popover).toBeVisible()

    await act(async () => {
      fireEvent.change(colorPicker, { target: { value: "#00ff00" } })
    })

    await act(async () => {
      fireEvent.keyDown(colorPicker, { key: "Escape", code: "Escape" })
    })

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith("#00ff00")
        expect(colorPicker).toHaveValue("#00ff00")
      },
      { timeout: 1000 },
    )

    await waitFor(
      () => {
        const popoverContent = container.querySelector(".ui-popover__content")
        expect(popoverContent).toHaveStyle("visibility: hidden")
      },
      { timeout: 1000 },
    )
  })

  test("ColorPicker handles input blur correctly", async () => {
    const { container } = render(
      <ColorPicker data-testid="colorPicker" isOpen />,
    )

    const colorPicker = screen.getByTestId("colorPicker")
    const popover = container.querySelector(".ui-popover")

    expect(popover).toBeVisible()

    await act(async () => {
      fireEvent.blur(colorPicker)
    })

    await waitFor(() => {
      expect(popover).toBeVisible()
    })
  })

  test("ColorPicker closes popover on container blur when closeOnBlur is true", async () => {
    const onCloseMock = vi.fn()
    const { container } = render(
      <ColorPicker
        data-testid="colorPicker"
        onClose={onCloseMock}
        isOpen
        closeOnBlur
      />,
    )

    const colorPickerContainer = container.querySelector(".ui-color-picker")
    expect(colorPickerContainer).not.toBeNull()
    const popover = container.querySelector(".ui-popover")

    expect(popover).toBeVisible()

    await act(async () => {
      fireEvent.blur(colorPickerContainer as Element, {
        relatedTarget: document.body,
      })
    })

    await waitFor(
      () => {
        expect(onCloseMock).toHaveBeenCalledTimes(1)
      },
      { timeout: 1000 },
    )

    await waitFor(
      () => {
        const popoverContent = container.querySelector(".ui-popover__content")
        expect(popoverContent).toHaveStyle("visibility: hidden")
      },
      { timeout: 1000 },
    )
  })

  test("ColorPicker does not close popover on container blur when closeOnBlur is false", async () => {
    const onCloseMock = vi.fn()
    const { container } = render(
      <ColorPicker
        data-testid="colorPicker"
        onClose={onCloseMock}
        isOpen
        closeOnBlur={false}
      />,
    )

    const colorPickerContainer = container.querySelector(".ui-color-picker")
    expect(colorPickerContainer).not.toBeNull()
    const popover = container.querySelector(".ui-popover")

    expect(popover).toBeVisible()

    await act(async () => {
      fireEvent.blur(colorPickerContainer as Element, {
        relatedTarget: document.body,
      })
    })

    await waitFor(
      () => {
        expect(onCloseMock).not.toHaveBeenCalled()
        expect(popover).toBeVisible()
      },
      { timeout: 1000 },
    )
  })

  test("onColorSelectorChange updates value and input value", async () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <ColorPicker data-testid="colorPicker" onChange={onChange} />,
    )

    const colorPicker = screen.getByTestId("colorPicker")

    await act(async () => {
      fireEvent.change(colorPicker, { target: { value: "#00ff00" } })
    })

    await new Promise((resolve) => setTimeout(resolve, 0))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("#00ff00")
      expect(colorPicker).toHaveValue("#00ff00")
    })

    rerender(<ColorPicker data-testid="colorPicker" onChange={onChange} />)
    await act(async () => {
      fireEvent.focus(colorPicker)
      fireEvent.change(colorPicker, { target: { value: "#ff0000" } })
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("#ff0000")
      expect(colorPicker).toHaveValue("#ff0000")
    })
  })

  test("onEyeDropperClick updates color when eye dropper is used", async () => {
    const onChange = vi.fn()
    const onChangeEnd = vi.fn()
    render(
      <ColorPicker
        data-testid="colorPicker"
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        withEyeDropper
      />,
    )

    const eyeDropperButton = screen.getByLabelText("Pick a color")

    await act(async () => {
      fireEvent.click(eyeDropperButton)
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("#00ff00")
      expect(onChangeEnd).toHaveBeenCalledWith("#00ff00")
    })

    const colorPicker = screen.getByTestId("colorPicker")
    expect(colorPicker).toHaveValue("#00ff00")
  })
})

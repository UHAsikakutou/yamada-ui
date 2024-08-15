import { render, screen, fireEvent } from "@yamada-ui/test"
import { ColorPicker } from "../src"
import { mockEyeDropper, resetEyeDropperMock } from "./utils/mock-eye-dropper"

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
})

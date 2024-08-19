import { a11y, fireEvent, render } from "@yamada-ui/test"
import { YearPicker } from "../src"

describe("<YearPicker />", () => {
  test("YearPicker renders correctly", async () => {
    await a11y(<YearPicker placeholder="basic" />)
  })

  describe("YearPicker test", () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })
    test("should change selected Year", async () => {
      const { container } = render(
        <YearPicker placeholder="basic" defaultValue={new Date()} />,
      )

      const nextYearStr = (new Date().getFullYear() + 1).toString()
      const selectBtn = container.querySelector(
        `button[data-value="${nextYearStr}"]`,
      )

      fireEvent.click(selectBtn!)

      expect(selectBtn).toHaveAttribute("data-selected")
    })
    test("should not selected any year when no value is selected", async () => {
      const { container } = render(<YearPicker placeholder="basic" />)

      const yearListButtons = container.querySelectorAll(
        `button.ui-calendar__year-list__button`,
      )

      yearListButtons.forEach((button) => {
        expect(button).not.toHaveAttribute("data-selected")
      })
    })
  })
})

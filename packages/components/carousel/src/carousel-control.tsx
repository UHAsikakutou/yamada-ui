import type { IconButtonProps } from "@yamada-ui/button"
import { IconButton } from "@yamada-ui/button"
import type { CSSUIObject } from "@yamada-ui/core"
import { forwardRef, useColorModeValue } from "@yamada-ui/core"
import { ChevronIcon } from "@yamada-ui/icon"
import { cx } from "@yamada-ui/utils"
import { useCarouselContext, useCarouselControl } from "./use-carousel"

export type CarouselControlProps = Omit<IconButtonProps, "aria-label"> & {
  ariaLabel?: string
}

export const CarouselControlPrev = forwardRef<CarouselControlProps, "button">(
  ({ className, ...rest }, ref) => {
    const { orientation } = useCarouselContext()

    const { getControlProps } = useCarouselControl({ operation: "prev" })

    return (
      <CarouselControl
        operation="prev"
        className={cx("ui-carousel__control--prev", className)}
        ariaLabel="Go to previous slide"
        icon={
          <ChevronIcon
            __css={{
              fontSize: "1.5em",
              transform:
                orientation === "vertical" ? "rotate(180deg)" : "rotate(90deg)",
            }}
          />
        }
        {...getControlProps(rest, ref)}
      />
    )
  },
)

export const CarouselControlNext = forwardRef<CarouselControlProps, "button">(
  ({ className, ...rest }, ref) => {
    const { orientation } = useCarouselContext()

    const { getControlProps } = useCarouselControl({ operation: "next" })

    return (
      <CarouselControl
        operation="next"
        className={cx("ui-carousel__control--next", className)}
        ariaLabel="Go to next slide"
        icon={
          <ChevronIcon
            __css={{
              fontSize: "1.5em",
              transform:
                orientation === "vertical" ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          />
        }
        {...getControlProps(rest, ref)}
      />
    )
  },
)

const CarouselControl = forwardRef<
  CarouselControlProps & { operation: "prev" | "next" },
  "button"
>(
  (
    { className, operation, ariaLabel = "carouselControl button", ...rest },
    ref,
  ) => {
    const { styles } = useCarouselContext()
    const colorScheme = useColorModeValue("whiteAlpha", "blackAlpha")

    const css: CSSUIObject = {
      ...styles.control,
      ...styles[operation],
    }

    return (
      <IconButton
        ref={ref}
        className={cx("ui-carousel__control", className)}
        colorScheme={colorScheme}
        isRounded
        aria-label={ariaLabel}
        __css={css}
        {...rest}
      />
    )
  },
)

import type { ComponentMultiStyle } from "@yamada-ui/core"
import { isAccessible, isGray } from "@yamada-ui/utils"

export const SegmentedControl: ComponentMultiStyle<"SegmentedControl"> = {
  baseStyle: {
    container: {
      display: "inline-flex",
      alignItems: "center",
      p: "1",
      bg: ["blackAlpha.100", "whiteAlpha.50"],
      _readOnly: { cursor: "default" },
      _disabled: { cursor: "not-allowed" },
    },
    cursor: {
      position: "absolute",
      w: "100%",
      h: "100%",
      boxShadow: ["md", "dark-md"],
    },
    button: {
      position: "relative",
      cursor: "pointer",
      flex: "1 1 0%",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      transitionProperty: "common",
      transitionDuration: "ultra-slow",
      fontWeight: "medium",
      whiteSpace: "nowrap",
      color: ["blackAlpha.800", "whiteAlpha.800"],
      _hover: {
        opacity: 0.7,
        _checked: {
          opacity: 1,
        },
      },
      _focusVisible: {
        boxShadow: "outline",
      },
      _readOnly: { cursor: "default" },
      _disabled: { opacity: 0.4, cursor: "not-allowed" },
    },
  },

  variants: {
    basic: ({ colorScheme: c = "gray" }) => ({
      container: {
        rounded: "lg",
      },
      cursor: {
        bg: isGray(c)
          ? [`whiteAlpha.800`, `${c}.700`]
          : [isAccessible(c) ? `${c}.400` : `${c}.500`, `${c}.600`],
        color: [isGray(c) || isAccessible(c) ? `black` : `white`, `white`],
        rounded: "md",
      },
      button: {
        rounded: "md",
        _checked: {
          color: [isGray(c) || isAccessible(c) ? `black` : `white`, `white`],
        },
      },
    }),
    rounded: ({ colorScheme: c = "gray" }) => ({
      container: {
        rounded: "full",
      },
      cursor: {
        bg: isGray(c)
          ? [`whiteAlpha.800`, `${c}.700`]
          : [isAccessible(c) ? `${c}.400` : `${c}.500`, `${c}.600`],
        color: [isGray(c) || isAccessible(c) ? `black` : `white`, `white`],
        rounded: "full",
      },
      button: {
        rounded: "full",
        _checked: {
          color: [isGray(c) || isAccessible(c) ? `black` : `white`, `white`],
        },
      },
    }),
  },

  sizes: {
    sm: {
      container: { minW: "xs" },
      button: { py: "1", px: "2", fontSize: "sm" },
    },
    md: {
      container: { minW: "sm" },
      button: { py: "1.5", px: "3", fontSize: "md" },
    },
    lg: {
      container: { minW: "md" },
      button: { py: "2", px: "4" },
    },
  },

  defaultProps: {
    variant: "basic",
    size: "md",
  },
}

import type { ComponentMultiStyle } from "@yamada-ui/core"

export const Checkbox: ComponentMultiStyle<"Checkbox"> = {
  baseStyle: {
    container: {
      cursor: "pointer",
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      verticalAlign: "top",
      _readOnly: { cursor: "auto" },
      _disabled: { cursor: "not-allowed" },
    },
    icon: ({ colorScheme: c = "primary" }) => ({
      position: "relative",
      display: "inline-block",
      userSelect: "none",
      transitionProperty: "box-shadow",
      transitionDuration: "normal",
      border: "2px solid",
      borderColor: "inherit",
      color: ["white", "black"],
      _checked: {
        bg: `${c}.500`,
        borderColor: `${c}.500`,
        color: ["white", "black"],
        _hover: {
          bg: `${c}.600`,
          borderColor: `${c}.600`,
        },
        _disabled: {
          bg: ["blackAlpha.400", "whiteAlpha.300"],
        },
      },
      _indeterminate: {
        bg: `${c}.500`,
        borderColor: `${c}.500`,
        color: ["white", "black"],
      },
      _disabled: {
        bg: ["blackAlpha.200", "whiteAlpha.100"],
        borderColor: ["transparent", "transparent"],
      },
      _focusVisible: {
        boxShadow: "outline",
      },
      _invalid: {
        borderColor: ["danger.500", "danger.400"],
        _focusVisible: {
          borderColor: "inherit",
          _checked: {
            borderColor: `${c}.500`,
          },
        },
      },
    }),
    label: {
      userSelect: "none",
      _disabled: { opacity: 0.4 },
    },
  },

  sizes: {
    sm: {
      icon: { boxSize: "3.5", rounded: "base", fontSize: "2xs" },
      label: { fontSize: "sm" },
    },
    md: {
      icon: { boxSize: "4", rounded: "base", fontSize: "2xs" },
      label: { fontSize: "md" },
    },
    lg: {
      icon: { boxSize: "5", rounded: "base", fontSize: "sm" },
      label: { fontSize: "lg" },
    },
  },

  defaultProps: {
    size: "md",
    colorScheme: "primary",
  },
}

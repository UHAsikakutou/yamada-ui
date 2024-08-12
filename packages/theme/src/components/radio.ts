import type { ComponentMultiStyle } from "@yamada-ui/core"

export const Radio: ComponentMultiStyle<"Radio"> = {
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
      userSelect: "none",
      transitionProperty: "box-shadow",
      transitionDuration: "normal",
      border: "2px solid",
      borderColor: "inherit",
      rounded: "full",
      color: "white",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      _checked: {
        _before: {
          content: `""`,
          display: "inline-block",
          rounded: "full",
          bg: [`${c}.500`, `${c}.600`],
        },
        _hover: {
          _before: {
            bg: [`${c}.600`, `${c}.700`],
          },
        },
        _disabled: {
          _before: {
            bg: ["blackAlpha.400", "whiteAlpha.300"],
          },
          _dark: {
            _before: {
              bg: "whiteAlpha.300",
            },
          },
        },
      },
      _disabled: {
        bg: ["blackAlpha.200", "whiteAlpha.100"],
      },
      _focusVisible: {
        boxShadow: "outline",
      },
      _invalid: {
        borderColor: ["danger.500", "danger.400"],
        _focusVisible: {
          borderColor: ["inherit", "inherit"],
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
      icon: {
        boxSize: "3.5",
        _before: {
          boxSize: "1.5",
        },
      },
      label: { fontSize: "sm" },
    },
    md: {
      icon: {
        boxSize: "4",
        _before: {
          boxSize: "2",
        },
      },
      label: { fontSize: "md" },
    },
    lg: {
      icon: {
        boxSize: "5",
        _before: {
          boxSize: "3",
        },
      },
      label: { fontSize: "lg" },
    },
  },

  defaultProps: {
    size: "md",
    colorScheme: "primary",
  },
}

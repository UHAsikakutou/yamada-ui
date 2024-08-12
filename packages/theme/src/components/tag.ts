import type { ComponentMultiStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import {
  getMemoizedObject as get,
  getColor,
  isGray,
  shadeColor,
  tintColor,
} from "@yamada-ui/utils"

export const Tag: ComponentMultiStyle<"Tag"> = {
  baseStyle: {
    container: {
      maxW: "100%",
      display: "inline-flex",
      alignItems: "center",
      gap: "fallback(1, 0.25rem)",
      verticalAlign: "top",
      outline: 0,
      fontWeight: "medium",
      rounded: "md",
      _focusVisible: {
        boxShadow: "outline",
      },
    },
    label: {
      overflow: "visible",
    },
    closeButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      cursor: "pointer",
      transitionProperty: "common",
      transitionDuration: "normal",
      rounded: "full",
      opacity: 0.5,
      _disabled: {
        opacity: 0.4,
      },
      _hover: {
        opacity: 0.8,
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
        },
      },
      _active: {
        opacity: 1,
      },
      _focusVisible: {
        boxShadow: "outline",
        bg: "rgba(0, 0, 0, 0.14)",
      },
    },
  },

  variants: {
    solid: {
      container: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => ({
        bg: [tintColor(`${c}.600`, 24)(t, m), shadeColor(`${c}.600`, 16)(t, m)],
        color: `white`,
      }),
    },
    subtle: {
      container: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => ({
        bg: [
          isGray(c) ? `${c}.50` : `${c}.100`,
          shadeColor(`${c}.300`, 58)(t, m),
        ],
        color: [`${c}.800`, isGray(c) ? `${c}.50` : `${c}.200`],
      }),
    },
    outline: {
      container: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => {
        const color = mode(
          getColor(`${c}.500`)(t, m),
          getColor(isGray(c) ? `${c}.100` : `${c}.400`)(t, m),
        )(m)

        return {
          color,
          boxShadow: `inset 0 0 0px 1px ${color}`,
        }
      },
    },
  },

  sizes: {
    sm: ({ theme: t }) => ({
      container: {
        minH: "6",
        minW: "6",
        fontSize: "xs",
        px: "2",
        lineHeight: get(t, "sizes.6"),
      },
    }),
    md: ({ theme: t }) => ({
      container: {
        minH: "7",
        minW: "7",
        fontSize: "sm",
        px: "2",
        lineHeight: get(t, "sizes.7"),
      },
    }),
    lg: ({ theme: t }) => ({
      container: {
        minH: "8",
        minW: "8",
        fontSize: "md",
        px: "3",
        lineHeight: get(t, "sizes.8"),
      },
    }),
  },

  defaultProps: {
    size: "md",
    variant: "subtle",
    colorScheme: "primary",
  },
}

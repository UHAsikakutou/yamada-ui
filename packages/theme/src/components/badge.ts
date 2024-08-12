import type { ComponentStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import {
  transparentizeColor,
  getColor,
  isGray,
  tintColor,
  shadeColor,
} from "@yamada-ui/utils"

export const Badge: ComponentStyle<"Badge"> = {
  baseStyle: {
    display: "inline-block",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    px: 1,
    textTransform: "uppercase",
    fontSize: "xs",
    rounded: "sm",
    fontWeight: "bold",
  },

  variants: {
    solid: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => ({
      bg: [tintColor(`${c}.600`, 24)(t, m), shadeColor(`${c}.600`, 16)(t, m)],
      color: `white`,
    }),
    subtle: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => ({
      bg: [
        isGray(c) ? `${c}.50` : `${c}.100`,
        shadeColor(`${c}.300`, 58)(t, m),
      ],
      color: [`${c}.800`, isGray(c) ? `${c}.50` : `${c}.200`],
    }),
    outline: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => {
      const color = mode(
        getColor(`${c}.500`)(t, m),
        getColor(
          isGray(c) ? `${c}.100` : transparentizeColor(`${c}.400`, 0.92)(t, m),
        )(t, m),
      )(m)

      return {
        color,
        boxShadow: `inset 0 0 0px 1px ${color}`,
      }
    },
  },

  defaultProps: {
    variant: "subtle",
    colorScheme: "primary",
  },
}

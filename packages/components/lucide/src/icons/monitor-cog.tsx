import { forwardRef } from "@yamada-ui/core"
import { MonitorCog as MonitorCogIcon } from "lucide-react"
import { LucideIcon } from "../lucide-icon"
import type { LucideIconProps } from "../lucide-icon"

export type MonitorCogProps = LucideIconProps

/**
 * `MonitorCog` is [Lucide](https://lucide.dev) SVG icon component.
 *
 * @see Docs https://yamada-ui.com/components/media-and-icons/lucide
 */
export const MonitorCog = forwardRef<MonitorCogProps, "svg">((props, ref) => (
  <LucideIcon ref={ref} as={MonitorCogIcon} {...props} />
))

import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import GLib from "gi://GLib?version=2.0"
import GObject from "gnim/gobject"

export const time = createPoll(GLib.DateTime.new_now_local(), 1000, () =>
  GLib.DateTime.new_now_local(),
)

export const range = (max: number) =>
  Array.from({ length: max + 1 }, (_, i) => i)

export function separatorBetween(
  elements: GObject.Object[],
  orientation: Gtk.Orientation,
) {
  const spacedElements: GObject.Object[] = []

  elements.forEach((element, index) => {
    if (index > 0) {
      spacedElements.push(new Gtk.Separator({ orientation: orientation }))
    }
    spacedElements.push(element)
  })

  return spacedElements
}

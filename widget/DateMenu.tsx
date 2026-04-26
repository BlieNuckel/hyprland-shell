import { With } from "ags"
import PopupWindow from "./common/PopupWindow"
import { Gtk } from "ags/gtk4"

export const WINDOW_NAME = "datemenu-window"

export default function DateMenu() {
  const layout = "top_center"

  return (
    <PopupWindow name={WINDOW_NAME} layout={layout}>
      <box
        orientation={Gtk.Orientation.VERTICAL}
        cssClasses={["window-content", "datemenu-container"]}
      >
        <Gtk.Calendar />
      </box>
    </PopupWindow>
  )
}

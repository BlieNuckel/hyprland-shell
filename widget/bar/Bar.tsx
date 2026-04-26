import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { onCleanup } from "gnim"
import { separatorBetween } from "../../utils"
import WorkspacePanelButton from "./WorkspacesPanelButton"
import TimePanelButton from "./TimePanelButton"
import NotifPanelButton from "./NotifPanelButton"
import LauncherPanelButton from "./LauncherPanelButton"

function Start() {
  return (
    <box $type="start">
      {separatorBetween(
        [LauncherPanelButton(), WorkspacePanelButton()],
        Gtk.Orientation.VERTICAL,
      )}
    </box>
  )
}

function Center() {
  return (
    <box $type="center">
      {separatorBetween(
        [TimePanelButton({}), NotifPanelButton()],
        Gtk.Orientation.VERTICAL,
      )}
    </box>
  )
}

function End() {
  return <box $type="end">{separatorBetween([], Gtk.Orientation.VERTICAL)}</box>
}

type BarProps = JSX.IntrinsicElements["window"] & {
  gdkmonitor: Gdk.Monitor
}

export default function Bar({ gdkmonitor, ...props }: BarProps) {
  let win: Astal.Window
  const { TOP } = Astal.WindowAnchor
  const anc = TOP

  onCleanup(() => {
    win.destroy()
  })

  return (
    <window
      visible
      $={(self) => {
        win = self
        self.set_default_size(1, 1)
      }}
      name={"bar"}
      namespace={"bar"}
      gdkmonitor={gdkmonitor}
      anchor={anc}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={app}
      {...props}
    >
      <centerbox cssClasses={["bar-container"]}>
        <Start />
        <Center />
        <End />
      </centerbox>
    </window>
  )
}

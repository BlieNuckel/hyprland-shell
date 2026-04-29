import app from "ags/gtk4/app"
import { createBinding, For, This } from "ags"
import Bar from "./widget/bar/Bar"
import AppLauncher from "./widget/AppLauncher"
import DateMenu from "./widget/DateMenu"
import NotificationWindow from "./widget/notification/NotificationWindow"
import NotificationPopup from "./widget/notification/NotificationPopup"

export default function windows() {
  const monitors = createBinding(app, "monitors")

  AppLauncher()
  DateMenu()
  NotificationWindow()

  return (
    <For each={monitors}>
      {(monitor) => (
        <This this={app}>
          <Bar gdkmonitor={monitor} />
          <NotificationPopup gdkmonitor={monitor} />
        </This>
      )}
    </For>
  )
}

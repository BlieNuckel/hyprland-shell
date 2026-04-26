import app from "ags/gtk4/app"
import { createBinding, For, This } from "gnim"
import Bar from "./widget/bar/Bar"
import AppLauncher from "./widget/AppLauncher"
import DateMenu from "./widget/DateMenu"

export default function windows() {
  const monitors = createBinding(app, "monitors")

  AppLauncher()
  DateMenu()

  return (
    <For each={monitors}>
      {(monitor) => (
        <This this={app}>
          <Bar gdkmonitor={monitor} />
        </This>
      )}
    </For>
  )
}

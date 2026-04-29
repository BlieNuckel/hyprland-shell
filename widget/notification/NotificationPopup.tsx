import { Astal, Gdk } from "ags/gtk4"
import { timeout } from "ags/time"
import AstalNotifd from "gi://AstalNotifd?version=0.1"
import { createState, For, onCleanup } from "ags"
import Notification from "./Notification"

export default function NotificationPopup({
  gdkmonitor,
}: {
  gdkmonitor: Gdk.Monitor
}) {
  const notifd = AstalNotifd.get_default()

  const [notifications, setNotifications] = createState<
    AstalNotifd.Notification[]
  >([])

  const notifiedHandler = notifd.connect("notified", (_, id, replaced) => {
    const notification = notifd.get_notification(id)

    if (replaced && notifications.peek().some((n) => n.id === id)) {
      setNotifications((ns) => ns.map((n) => (n.id === id ? notification! : n)))
    } else {
      setNotifications((ns) => [notification!, ...ns])
    }

    timeout(5000, () => {
      setNotifications((ns) => ns.filter((n) => n.id !== id))
    })
  })

  const resolvedHandler = notifd.connect("resolved", (_, id) => {
    setNotifications((ns) => ns.filter((n) => n.id !== id))
  })

  onCleanup(() => {
    notifd.disconnect(notifiedHandler)
    notifd.disconnect(resolvedHandler)
  })

  return (
    <window
      $={(self) => onCleanup(() => self.destroy())}
      namespace="notification-popup"
      gdkmonitor={gdkmonitor}
      visible={notifications((ns) => ns.length > 0)}
      anchor={Astal.WindowAnchor.TOP}
    >
      <box>
        <For each={notifications}>
          {(notification) => <Notification n={notification} />}
        </For>
      </box>
    </window>
  )
}

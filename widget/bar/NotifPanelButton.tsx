import AstalApps from "gi://AstalApps"
import AstalNotifd from "gi://AstalNotifd"
import { createBinding, createConnection, With } from "ags"
import PanelButton from "../common/PanelButton"
import { Gtk } from "ags/gtk4"

const WINDOW_NAME = ""

const notifd = AstalNotifd.get_default()
const dndBind = createBinding(notifd, "dontDisturb")

function NotifIcon() {
  const getVisible = () =>
    notifd.dont_disturb ? true : notifd.notifications.length <= 0

  const visibility = createConnection(
    getVisible(),
    [notifd, "notify::dont-disturb", (_, __) => getVisible()],
    [notifd, "notify::notifications", (_, __) => getVisible()],
  )

  return (
    <image
      visible={visibility()}
      cssClasses={["icon"]}
      iconName={dndBind(
        (dnd) => `notification-${dnd ? "disabled-" : ""}symbolic`,
      )}
    />
  )
}

export default function NotifPanelButton() {
  const apps = new AstalApps.Apps()
  const substitute: Record<string, string> = {
    "Screen Recorder": "record-screen-symbolic",
    Screenshot: "gnome-screenshot-symbolic",
    Hyprpicker: "color-select-symbolic",
  }

  const notifications = createBinding(notifd, "notifications")

  return (
    <PanelButton window={WINDOW_NAME} onClicked={() => {}}>
      <With value={notifications}>
        {(notifs) =>
          notifs.length == 0 ? (
            <NotifIcon />
          ) : (
            <box spacing={6} halign={Gtk.Align.CENTER}>
              {(notifs.length > 3 ? notifs.slice(0, 3) : notifs).map((n) => {
                const getFallback = (appName: string) => {
                  const getApp = apps.fuzzy_query(appName)
                  if (getApp.length > 0) return getApp[0].get_icon_name()
                  return "unknown"
                }

                const fallback =
                  n.app_icon.trim() === ""
                    ? getFallback(n.app_name)
                    : n.app_icon

                const icon = substitute[n.app_name] ?? fallback
                return <image iconName={icon} />
              })}
            </box>
          )
        }
      </With>
    </PanelButton>
  )
}

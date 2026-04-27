import { Gtk } from "ags/gtk4"
import Adw from "gi://Adw?version=1"
import AstalNotifd from "gi://AstalNotifd?version=0.1"
import GLib from "gi://GLib?version=2.0"
import Pango from "gi://Pango?version=1.0"

const time = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_local(time).format(format)

const isIcon = (icon: string) => {
  const iconTheme = new Gtk.IconTheme()
  return iconTheme.has_icon(icon)
}

const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS)

const urgency = (n: AstalNotifd.Notification) => {
  const { LOW, NORMAL, CRITICAL } = AstalNotifd.Urgency

  switch (n.urgency) {
    case LOW:
      return "low"
    case CRITICAL:
      return "critical"
    case NORMAL:
    default:
      return "normal"
  }
}

function NotificationHeader({ n }: { n: AstalNotifd.Notification }) {
  return (
    <box cssClasses={["header"]} spacing={4}>
      {(n.appIcon || n.desktopEntry) && (
        <image
          cssClasses={["app-icon"]}
          visible={!!(n.appIcon || n.desktopEntry)}
          iconName={n.appIcon || n.desktopEntry}
        />
      )}
      <label
        cssClasses={["app-name"]}
        halign={Gtk.Align.START}
        label={n.appName || "Unknown"}
      />
      <button onClicked={() => n.dismiss()}>
        <image iconName={"window-close-symbolic"} />
      </button>
    </box>
  )
}

function NotificationContent({ n }: { n: AstalNotifd.Notification }) {
  return (
    <box cssClasses={["content"]} spacing={10}>
      {n.image && fileExists(n.image) && (
        <box valign={Gtk.Align.START} cssClasses={["image"]}>
          <image file={n.image} overflow={Gtk.Overflow.HIDDEN} pixelSize={60} />
        </box>
      )}
      {n.image && isIcon(n.image) && (
        <box cssClasses={["icon-image"]} valign={Gtk.Align.START}>
          <image
            iconName={n.image}
            iconSize={Gtk.IconSize.LARGE}
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.CENTER}
          />
        </box>
      )}
      <box orientation={Gtk.Orientation.VERTICAL}>
        <label
          cssClasses={["summary"]}
          ellipsize={Pango.EllipsizeMode.END}
          halign={Gtk.Align.START}
          xalign={0}
          label={n.summary}
        />
        {n.body && (
          <label
            cssClasses={["body"]}
            ellipsize={Pango.EllipsizeMode.END}
            halign={Gtk.Align.START}
            xalign={0}
            label={n.body}
          />
        )}
      </box>
    </box>
  )
}

function NotificationActions({ n }: { n: AstalNotifd.Notification }) {
  return (
    <box cssClasses={["actions"]} spacing={6}>
      {n.get_actions().map(({ label, id }) => (
        <button hexpand onClicked={() => n.invoke(id)}>
          <label
            label={label}
            halign={Gtk.Align.CENTER}
            hexpand
            maxWidthChars={30}
            wrap
          />
        </button>
      ))}
    </box>
  )
}

export default function Notification({
  n,
  showActions = true,
}: {
  n: AstalNotifd.Notification
  showActions?: boolean
}) {
  return (
    <Adw.Clamp maximum_size={400}>
      <box
        name={n.id.toString()}
        cssClasses={["window-content", "notification-container", urgency(n)]}
        hexpand={false}
        vexpand={false}
        widthRequest={400}
      >
        <box orientation={Gtk.Orientation.VERTICAL}>
          <NotificationHeader n={n} />
          <Gtk.Separator visible orientation={Gtk.Orientation.HORIZONTAL} />
          <NotificationContent n={n} />
          {showActions && n.get_actions().length > 0 && (
            <NotificationActions n={n} />
          )}
        </box>
      </box>
    </Adw.Clamp>
  )
}

import { execAsync } from "ags/process"
import GLib from "gi://GLib?version=2.0"

const options = {
  wallpaper: {
    folder: GLib.get_home_dir(),
    current: await execAsync("awww query")
      .then((out) => out.split("image:")[1].trim())
      .catch(() => ""),
  },
}

export default options

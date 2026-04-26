import app from "ags/gtk4/app"
import { WINDOW_NAME } from "../AppLauncher"
import PanelButton from "../common/PanelButton"

export default function LauncherPanelButton() {
  return (
    <PanelButton
      window={WINDOW_NAME}
      onClicked={() => app.toggle_window(WINDOW_NAME)}
    >
      <image iconName="preferences-desktop-apps-symbolic" />
    </PanelButton>
  )
}

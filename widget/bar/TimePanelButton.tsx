import { time } from "../../utils"
import PanelButton from "../common/PanelButton"

const WINDOW_NAME = "time-panel"

export default function TimePanelButton({ format = "%H:%M" }) {
  return (
    <PanelButton window={WINDOW_NAME} onClicked={() => {}}>
      <label label={time((t) => t.format(format)!)} />
    </PanelButton>
  )
}

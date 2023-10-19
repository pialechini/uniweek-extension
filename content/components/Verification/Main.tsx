import { createRoot } from "react-dom/client";
import WeekScheduleCode from "@root/src/pages/content/components/Verification/VerificationCode";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { MessageObject } from "@root/src/types/types";

refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "uniweek-extension";

document.body.append(root);

const rootIntoShadow = document.createElement("div");
rootIntoShadow.id = "shadow-root";

const shadowRoot = root.attachShadow({ mode: "open" });
shadowRoot.appendChild(rootIntoShadow);

const reactRoot = createRoot(rootIntoShadow);

// A utility variable to trigger re-render
// on App omponent
let trigger = false;

chrome.runtime.onMessage.addListener(async (message: MessageObject) => {
  if (message.action !== "getWeekSchedule") {
    return;
  }

  // re-render App component
  trigger = !trigger;
  reactRoot.render(<WeekScheduleCode trigger={trigger} />);
});
